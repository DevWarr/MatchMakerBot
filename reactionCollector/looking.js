const Collector = require("../reactionCollector")
const variables = require("../utils/variables")

exports.run = (client, botId, reactions, user1, reaction, user) => {
    // Assign functions
    const log = client.commands.get("log")

    // Some "error" handling
    if (user.id === botId) return
    if (!reaction.me) reaction.remove(user.id).catch(log)
    // if (user.id === user1) reaction.remove(user.id).catch(log)

    // Setting init values:
    // msg, member, and reactions
    const msg = reaction.message
    const { challenger } = reactions
    // Final error check
    if (reaction.name !== challenger)
        reaction.remove(user.id).catch(log)

    // Create our custom message
    const stringArray = variables.stringArrays.challenger
    const randomString =
        stringArray[Math.floor(Math.random() * stringArray.length)]
    const punc = Math.round(Math.random) ? "!" : "."

    // And send it to the channel, listening for reactions
    msg.channel
        .send(`<@${user.id}> ${randomString} <@${user1}>${punc}`)
        .then(msg => {
            new Collector(msg, "CHALLENGER", { user1: user1, user2: user.id }, client).initiate()
            msg.react(reactions.ok).catch(log)
        })
        .catch(log)
}
