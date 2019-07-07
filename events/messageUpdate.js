const variables = require("../utils/variables.js")

module.exports = (client, omsg, nmsg) => {
    // Get log command
    const log = client.commands.get("log")

    // ONLY listen for message updates if the updates are within
    // the bot allowed channels
    if (
        omsg.channel.id !== variables.channels.freeBotTesting ||
        nmsg.channel.id !== variables.channels.freeBotTesting ||
        omsg.channel.id !== variables.channels.matchmaking ||
        nmsg.channel.id !== variables.channels.matchmaking
    )
        return
    log("message update detected!")
}
