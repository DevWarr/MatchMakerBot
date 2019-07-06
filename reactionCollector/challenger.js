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

const roleReset = (member, removers) => {
    removers.forEach(role => {
        if (member.roles.get(variables.roles[`${role}`])) {
            member.removeRole(variables.roles[`${role}`])
        }
    })
}

exports.run = (client, botId, reactions, user1, user2, reaction, user) => {
    // Some "error" handling
    if (user.id === botId) return
    if (!reaction.me) reaction.remove(user.id).catch(console.error)
    if (user.id !== user1) reaction.remove(user.id).catch(console.error)

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
    const { ok } = reactions
    // Final error check
    if (reaction.name !== ok) reaction.remove(user.id).catch(console.error)

    // Alright, step one is to remove the extra messages, and set both users' roles
    msgRemover(msg.channel, user1, user2)
    roleReset(member1, Object.keys(variables.roles))
    roleReset(member2, Object.keys(variables.roles))
    member1.addRole(role).catch(console.error)
    member2.addRole(role).catch(console.error)

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
    channelCategory
        .edit({
            permissionOverwrites: [
                {
                    id: msg.guild.id,
                    deny: ["VIEW_CHANNEL"]
                },
                { id: user1, allow: ["VIEW_CHANNEL"] },
                { id: user2, allow: ["VIEW_CHANNEL"] }
            ]
        })
        .catch(console.error)
    console.log(channelCategory.id)

    // The voice channel
    const voiceChannel = msg.guild
        .createChannel(`voice-${channelName}`, {
            type: "voice",
            permissionOverwrites: [
                {
                    id: msg.guild.id,
                    deny: ["VIEW_CHANNEL"]
                },
                { id: user1, allow: ["VIEW_CHANNEL"] },
                { id: user2, allow: ["VIEW_CHANNEL"] }
            ]
        })
        .then(
            channel => channel.setParent(channelCategory.id).catch(console.log) // appended to the category
        )
        .catch(console.log)

    // The text channel
    const textChannel = msg.guild
        .createChannel(`text- ${channelName}`, {
            type: "text",
            permissionOverwrites: [
                {
                    id: msg.guild.id,
                    deny: ["VIEW_CHANNEL"]
                },
                { id: user1, allow: ["VIEW_CHANNEL"] },
                { id: user2, allow: ["VIEW_CHANNEL"] }
            ]
        })
        .then(
            channel => channel.setParent(channelCategory.id).then(channel => channel.send()).catch(console.log) // appended to the category
        )
        .catch(console.log)



    // Create an "info" object
    const info = {
        user1: user1,
        user2: user2,
        channel1: textChannel,
        channel2: voiceChannel
    }
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
                info,
                client
            ).initiate()
        })
        .catch(console.error)
}