const Collector = require("../reactionCollector")

exports.run = (client, botId, reactions, user1, user2, reaction, user) => {
    // Some "error" handling
    if (user.id === botId) return
    if (!reaction.me) reaction.remove(user.id).catch(console.error)
    if (user.id !== user1 || user.id !== user2)
        reaction.remove(user.id).catch(console.error)
}
