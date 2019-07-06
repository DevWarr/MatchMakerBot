/*
    Listener for the Main Info section of the matchmaker.
    This is the Message with all the initial info
    "Click here to loook for opponent, to say you're busy, etc"
    Allowed Reactions:
      - ping
      - noPing
*/

// Paramters: (botId, Obj of allowed reactions, reaction given, user who gave the reaction)
exports.run = (botId, { looking, available, inGame, doNotDisturb }, reaction, user) => {
    // Some "error" handling
    if (user.id === botId) return
    if (!reaction.me) reaction.remove(user.id).catch(console.error)

    switch (reaction.emoji.name) {
        case available:
            reaction.remove(user.id).catch(console.error)
            reaction.message.channel
                .send(`<@${user.id}>, you have opted for notifications!`)
                .then(msg => {
                    const k = setTimeout(() => msg.delete(5000))
                })
                .catch(console.error)
            break

        case doNotDisturb:
            reaction.remove(user.id).catch(console.error)
            reaction.message.channel
                .send(`<@${user.id}>, you have turned off notifications.`)
                .then(msg => {
                    const k = setTimeout(() => msg.delete(5000))
                })
                .catch(console.error)
            break

        default:
            console.log("No valid checks.")
            return
    }
}
