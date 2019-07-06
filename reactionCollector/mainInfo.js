const Collector = require("../reactionCollector")
const variables = require("../utils/variables.js")

const msgRemover = (channel, user1, user2 = null) => {
    const arrayWithUser = channel.messages.filter(
        message =>
            !message.mentions.users.get(variables.users.bot) &&
            message.mentions.users.get(user1)
    )
    arrayWithUser.forEach(msg => {
        if ([...msg.mentions.users].length === 1)
            msg.delete(500).catch(console.error)
    })
}

/*
    Listener for the Main Info section of the matchmaker.
    This is the Message with all the initial info
    "Click here to look for opponent, to say you're busy, etc"
    Allowed Reactions:
      - looking
      - available
      - inGame
      - doNotDisturb
*/

exports.run = (client, botId, reactions, reaction, user) => {
    // Some "error" handling
    if (user.id === botId) return
    if (!reaction.me) return reaction.remove(user.id).catch(console.error)

    // Setting init values:
    // msg, member, and reactions
    const msg = reaction.message
    const member = client.guilds
        .get(variables.guilds.warvdineBotTesting)
        .members.get(user.id)
    const { looking, available, inGame, doNotDisturb } = reactions
    const roleAssign = client.commands.get(roleAssign)
    // Final error check

    switch (reaction.emoji.name) {
        case looking: {
            // Remove reaction
            reaction.remove(user.id).catch(console.error)

            // Check role. If role already exists, leave it.
            // If role doesn't exist, remove other roles and add this one
            const role = variables.roles.looking
            if (member.roles.get(role)) return
            roleAssign(member, Object.keys(variables.roles), role)

            // Spice things up with a random string!
            const stringArray = [
                `**is looking for an opponent!**`,
                `**seeks a new challenger.**`,
                `**is searching for someone to fight!**`
            ]
            const randomString =
                stringArray[Math.floor(Math.random() * stringArray.length)]

            // Send a new message to the channel, and start listening for reactions!
            msg.channel
                .send(
                    `<@${user.id}> ${randomString}\n\n<@&${
                        variables.roles.looking
                    }> <@&${variables.roles.available}>`
                )
                .then(msg => {
                    new Collector(
                        msg,
                        "LOOKING",
                        { user1: user.id },
                        client
                    ).initiate()
                    msg.react(reactions.challenger).catch(console.error)
                })
                .catch(console.error)
            break
        }

        case available: {
            // Remove reaction
            reaction.remove(user.id).catch(console.error)

            // Check role. If role already exists, leave it.
            // If role doesn't exist, remove other roles and add this one
            const role = variables.roles.available
            if (member.roles.get(role)) return
            roleAssign(member, Object.keys(variables.roles), role)

            // If user was looking, remove their looking message
            msgRemover(msg.channel, user.id)
            break
        }

        case inGame: {
            // Remove reaction
            reaction.remove(user.id).catch(console.error)

            // Check role. If role already exists, leave it.
            // If role doesn't exist, remove other roles and add this one
            const role = variables.roles.inGame
            if (member.roles.get(role)) return
            roleAssign(member, Object.keys(variables.roles), role)

            // If user was looking, remove their looking message
            msgRemover(msg.channel, user.id)
            break
        }

        case doNotDisturb: {
            // Remove reaction
            reaction.remove(user.id).catch(console.error)

            // Check role. If role already exists, leave it.
            // If role doesn't exist, remove other roles and add this one
            const role = variables.roles.doNotDisturb
            if (member.roles.get(role)) return
            roleAssign(member, Object.keys(variables.roles), role)

            // If user was looking, remove their looking message
            msgRemover(msg.channel, user.id)
            break
        }

        default:
            console.log("No valid checks.")
            return
    }
}
