/*
    Listener for the Main Info section of the matchmaker.
    This is the Message with all the initial info
    "Click here to loook for opponent, to say you're busy, etc"
    Allowed Reactions:
      - ping
      - noPing
*/

// Paramters: (botId, Obj of allowed reactions, reaction given, user who gave the reaction)
exports.run = (botId, { ping, noPing }, reaction, user) => {
    console.log(user.id, user.username, reaction.me, reaction.emoji.name)
    console.log(ping, noPing)
    console.log("\n")
    if (user.id === botId) return
    if (!reaction.me) reaction.remove(user.id).catch(console.error)
    console.log("Past the checkers")
    switch (reaction.emoji.name) {
        case ping:
            reaction.remove(user.id).catch(console.error)
            console.log("PING!")
            reaction.message.channel
                .send(`<@${user.id}>, you have opted for notifications!`)
                .then(msg => {
                    const k = setTimeout(() => msg.delete(5000))
                })
                .catch(console.error)
            break
        case noPing:
            reaction.remove(user.id).catch(console.error)
            console.log("No ping.")
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
