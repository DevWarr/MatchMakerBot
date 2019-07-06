const Collector = require("../reactionCollector")
const variables = require("../utils/variables.js")

const msgRemover = (channel, user1, user2 = null) => {
    const arrayWithUser = channel.messages.filter(
        message =>
            !message.mentions.users.get(variables.users.bot) &&
            (message.mentions.users.get(user1) ||
                message.mentions.users.get(user2))
    )
    arrayWithUser.forEach(msg => {
        if ([...msg.mentions.users].length <= 2)
            msg.delete().catch(console.error)
    })
}


exports.run = (client, botId, reactions, user1, user2, reaction, user) => {
    // Some "error" handling
    if (user.id === botId) return
    if (!reaction.me) return reaction.remove(user.id).catch(console.error)
    // if (user.id !== user1) return reaction.remove(user.id).catch(console.error)

    // Setting init values:
    // msg, member, and reactions
    const msg = reaction.message
    const member1 = client.guilds
        .get(variables.guilds.warvdineBotTesting)
        .members.get(user1)
    const member2 = client.guilds
        .get(variables.guilds.warvdineBotTesting)
        .members.get(user2)
    const role = variables.roles.inGame
    const { ok, door } = reactions
    const roleAssign = client.commands.get(roleAssign)
    // Final error check
    if (reaction.emoji.name !== ok)
        return reaction.remove(user.id).catch(console.error)

    // Alright, step one is to remove the extra messages, and set both users' roles
    msgRemover(msg.channel, user1, user2)
    roleAssign(member1, Object.keys(variables.roles), role)
    roleAssign(member2, Object.keys(variables.roles), role)

    // Then we need to create our new channel:

    // Get our users' full object so we have their username
    user1 = msg.guild.members.find(member => member.user.id === user1).user
    user2 = msg.guild.members.find(member => member.user.id === user2).user

    // To create a channel name, we shall do this!
    const channelName = `${user1.username}-vs-${user2.username}`
        .replace(/[^a-z0-9-_]/gi, "")
        .toLowerCase()

    // Our main category channel
    const channelCategory = msg.guild.channels.get(
        variables.channels.matchesGroup
    )

    let textChannel, voiceChannel
    // The voice channel
    msg.guild
        .createChannel(`voice-${channelName}`, {
            type: "voice",
            permissionOverwrites: [
                {
                    id: msg.guild.id,
                    deny: ["VIEW_CHANNEL"]
                },
                { id: user1, allow: ["VIEW_CHANNEL"] },
                { id: user2, allow: ["VIEW_CHANNEL"] },
                { id: botId, allow: ["VIEW_CHANNEL"] }
            ]
        })
        .then(
            channel => {
                voiceChannel = msg.guild.channels.get(channel.id)
                channel.setParent(channelCategory.id).catch(console.log)
            } // appended to the category
        )
        .catch(console.log)

    // The text channel
    msg.guild
        .createChannel(`${channelName}`, {
            type: "text",
            permissionOverwrites: [
                {
                    id: msg.guild.id,
                    deny: ["VIEW_CHANNEL"]
                },
                { id: user1, allow: ["VIEW_CHANNEL"] },
                { id: user2, allow: ["VIEW_CHANNEL"] },
                { id: botId, allow: ["VIEW_CHANNEL"] }
            ]
        })
        .then(
            channel => {
                textChannel = msg.guild.channels.get(channel.id)
                channel
                    .setParent(channelCategory.id)
                    // Once created, we prep our mystical message
                    .then(channel => {
                        const introMsg = `<@${user1.id}> and <@${
                            user1.id
                        }>! This is the time for you two to compete. May the best player win.\n\nWhen either of you are ready to leave, just click the door and these two channels will be deleted.\n**Remember:**`
                        const stringsArray = [
                            `I know who the victor is before the match has even begun.`,
                            `The best way to win is to outplay your opponent.`,
                            `Take it easy out there.`,
                            `It is only a game.`,
                            `You'll always be better than the bot. I don't even have hands!`
                        ]
                        const randomString =
                            stringsArray[
                                Math.floor(Math.random() * stringsArray.length)
                            ]
                        // Here we send the message, create a new collector, and react to our message
                        channel
                            .send(`${introMsg} ${randomString}`)
                            .then(msg => {
                                // Create an "info" object
                                const info = {
                                    user1: user1.id,
                                    user2: user2.id,
                                    channel1: textChannel.id,
                                    channel2: voiceChannel.id
                                }
                                new Collector(
                                    msg,
                                    "MATCH_INFO",
                                    info,
                                    client
                                ).initiate()
                                msg.react(door)
                            })
                    })
                    .catch(console.log)
            } // appended to the category
        )
        .catch(console.log)

    msg.channel
        .send(
            `<@${user1.id}> vs <@${
                user2.id
            }> now in progress at #${channelName}. Please proceed there to communicate.\nThe match has begun!\n\n(Thank you for using <@${
                variables.users.bot
            }>!)`
        )
        .then(msg => {
            new Collector(
                msg,
                "MATCH_CREATED",
                { user1: user1.id, user2: user2.id },
                client
            ).initiate()
        })
        .catch(console.error)
}
