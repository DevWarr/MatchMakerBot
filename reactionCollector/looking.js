const Collector = require("../reactionCollector")
const variables = require("../utils/variables.js")

exports.run = (client, botId, reactions, reaction, user) => {
    // Some "error" handling
    if (user.id === botId) return
    if (!reaction.me) reaction.remove(user.id).catch(console.error)

    // Setting init values:
    // msg, member, and reactions
    const msg = reaction.message
    const member = client.guilds
        .get(variables.guilds.warvdineBotTesting)
        .members.get(user.id)
    const { challenger } = reactions
}