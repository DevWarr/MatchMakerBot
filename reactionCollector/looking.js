const Collector = require("../reactionCollector")

exports.run = (client, botId, reactions, user1, reaction, user) => {
    // Some "error" handling
    if (user.id === botId) return
    if (!reaction.me) reaction.remove(user.id).catch(console.error)
    // if (user.id === user1) reaction.remove(user.id).catch(console.error)

    // Setting init values:
    // msg, member, and reactions
    const msg = reaction.message
    const { challenger } = reactions
    // Final error check
    if (reaction.name !== challenger)
        reaction.remove(user.id).catch(console.error)

    const stringArray = [`challenges`, `offers to play with`, `wants to fight`]
    const randomString =
        stringArray[Math.floor(Math.random() * stringArray.length)]
    const punc = Math.round(Math.random) ? "!" : "."
    msg.channel
        .send(`<@${user.id}> ${randomString} <@${user1}>${punc}`)
        .then(msg => {
            new Collector(msg, "CHALLENGER", { user1: user1, user2: user.id }, client).initiate()
            msg.react(reactions.ok).catch(console.error)
        })
        .catch(console.error)
}
