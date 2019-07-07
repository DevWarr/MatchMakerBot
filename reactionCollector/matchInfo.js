const Collector = require("../reactionCollector")
const variables = require("../utils/variables.js")

exports.run = (
    client,
    botId,
    reactions,
    { user1, user2, channel1, channel2 },
    reaction,
    user
) => {
    // Get commands for usage
    const msgRemover = client.commands.get("msgRemover").run
    const log = client.commands.get("log")

    // Some "error" handling
    if (user.id === botId) return
    if (!reaction.me) return reaction.remove(user.id).catch(log)
    if (user.id !== user1 && user.id !== user2)
        return reaction.remove(user.id).catch(log)

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
    if (reaction.emoji.name !== door) return reaction.remove(user.id).catch(log)

    // Delete channels
    textChannel.delete().catch(log)
    voiceChannel.delete().catch(log)
    const matchmaking = client.guilds
        .get(variables.guilds.warvdineBotTesting)
        .channels.get(variables.channels.matchmaking)

    // Remove roles and delete match announcement message
    roleAssign(member1, Object.keys(variables.roles), null)
    roleAssign(member2, Object.keys(variables.roles), null)
    msgRemover(matchmaking, user1, user2)
}
