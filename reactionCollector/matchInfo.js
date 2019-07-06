const Collector = require("../reactionCollector")
const variables = require("../utils/variables.js")

const msgRemover = (channel, user1, user2 = null) => {
    const arrayWithUser = channel.messages.filter(
        message =>
            !message.mentions.users.get(variables.users.bot) &&
            message.mentions.users.get(user1) &&
            message.mentions.users.get(user2)
    )
    arrayWithUser.forEach(msg => {
        if ([...msg.mentions.users].length >= 2)
            msg.delete().catch(console.error)
    })
}

exports.run = (
    client,
    botId,
    reactions,
    { user1, user2, channel1, channel2 },
    reaction,
    user
) => {
    // Some "error" handling
    if (user.id === botId) return
    if (!reaction.me) return reaction.remove(user.id).catch(console.error)
    if (user.id !== user1 || user.id !== user2)
        return reaction.remove(user.id).catch(console.error)

    // Setting init values:
    // Msg
    const msg = reaction.message

    // Members
    const member1 = client.guilds
        .get(variables.guilds.warvdineBotTesting)
        .members.get(user1)
    const member2 = client.guilds
        .get(variables.guilds.warvdineBotTesting)
        .members.get(user2)

    // Channels
    const textChannel = client.guilds
        .get(variables.guilds.warvdineBotTesting)
        .channels.get(channel1)
    const voiceChannel = client.guilds
        .get(variables.guilds.warvdineBotTesting)
        .channels.get(channel2)

    // Role and Reactions
    const role = variables.roles.inGame
    const { door } = reactions

    // Final error check
    if (reaction.emoji.name !== door)
        return reaction.remove(user.id).catch(console.error)

    textChannel.delete().catch(console.error)
    voiceChannel.delete().catch(console.error)
    const matchmaking = client.guilds.get(variables.guilds.warvdineBotTesting).channels.get(variables.channels.matchmaking)
    msgRemover(matchmaking, user1, user2)
}
