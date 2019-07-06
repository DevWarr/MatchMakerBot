const Collector = require("../reactionCollector")

exports.run = (client, botId, reactions, user1, user2, reaction, user) => {
    // Some "error" handling
    if (user.id === botId) return
    if (!reaction.me) return reaction.remove(user.id).catch(console.error)
    if (user.id !== user1 || user.id !== user2)
        return reaction.remove(user.id).catch(console.error)

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
    const { door } = reactions
    // Final error check
    if (reaction.name !== door) return reaction.remove(user.id).catch(console.error)


}
