const Collector = require("../reactionCollector")
const variables = require("../utils/variables.js")

exports.run = client => {
    console.log("Fetching messages...")
    const matchmaking = client.channels.find(
        channel => channel.id === variables.channels.matchmaking
    )
    matchmaking
        .fetchMessages()
        .then(messages => {
            messages.forEach(message =>
                message
                    .delete()
                    .then(() => {
                        const msgInfo = {
                            looking: "✅",
                            available: "🔔",
                            inGame: "⛔",
                            doNotDisturb: "🔕",
                            challenger: "⚔",
                            ok: "🆗"
                        }
                        matchmaking
                            .send(
                                `Click on a reaction emoji to set your matchmaking role!\n\n${
                                    msgInfo.looking
                                } Looking for Opponent\n${
                                    msgInfo.available
                                } Potentially Available\n${
                                    msgInfo.inGame
                                } In Game\n${
                                    msgInfo.doNotDisturb
                                } Do Not Disturb\n\nIf a user is looking for an opponent, there will be a message down below. If you would like to challenge them, click the ${
                                    msgInfo.challenger
                                } emoji.\nThey can accept your challenge by clicking the ${
                                    msgInfo.ok
                                } emoji.\n\nNeed help, have suggestions, or see bugs? Please notify <@${variables.users.warvdine}> and help will reach you soon!`
                            )
                            .then(msg => {
                                new Collector(
                                    msg,
                                    "MAIN_INFO",
                                    msgInfo
                                ).initiate()
                                msg.react(msgInfo.looking)
                                    .then(r =>
                                        r.message
                                            .react(msgInfo.available)
                                            .then(r =>
                                                r.message
                                                    .react(msgInfo.inGame)
                                                    .then(r =>
                                                        r.message.react(
                                                            msgInfo.doNotDisturb
                                                        )
                                                    )
                                                    .catch(console.error)
                                            )
                                            .catch(console.error)
                                    )
                                    .catch(console.error)
                            })
                            .catch(console.error)
                    })
                    .catch(console.error)
            )
        })
        .catch(console.error)

    const freeBotTesting = client.channels.find(
        channel => channel.id === variables.channels.freeBotTesting
    )
    freeBotTesting
        .fetchMessages()
        .then(messages => {
            messages.forEach(message => {
                if (!message.author.bot) {
                    message.delete().catch(console.error)
                }
            })
        })
        .catch(console.error)

    console.log("Messages fetched!")
    console.log("I am ready!")
}
