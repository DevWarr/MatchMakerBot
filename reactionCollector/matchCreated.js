const Collector = require("../reactionCollector")

exports.run = (client, botId, reactions, user1, user2, reaction, user) => {
    // Get commands for usage
    const log = client.commands.get("log")

    // Some "error" handling
    if (user.id === botId) return
    if (!reaction.me) return reaction.remove(user.id).catch(log)
    if (user.id !== user1 || user.id !== user2)
        return reaction.remove(user.id).catch(log)
}
