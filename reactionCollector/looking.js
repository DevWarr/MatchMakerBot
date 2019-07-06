const Collector = require("../reactionCollector")
const variables = require("../utils/variables.js")

exports.run = (client, botId, reactions, user1, reaction, user) => {
    // Some "error" handling
    if (user.id === botId) return
    if (!reaction.me) reaction.remove(user.id).catch(console.error)
    if (user.id === user1) reaction.remove(user.id).catch(console.error)

    // Setting init values:
    // msg, member, and reactions
    const msg = reaction.message
    const member = client.guilds
        .get(variables.guilds.warvdineBotTesting)
        .members.get(user.id)
    const { challenger } = reactions
    // Final error check
    if (reaction.name !== challenger) reaction.remove(user.id).catch(console.error)

    
}