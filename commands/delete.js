const variables = require("../utils/variables.js")

exports.run = (client, message, args) => {
    // Get log command
    const log = client.commands.get("log")

    // Just a safety check
    if (message.author.id !== variables.users.warvdine) return 

    args.forEach(channelId => {
        const channel = message.guild.channels.get(channelId)
        log(channelId)
        log(channel)
        channel.delete().catch(log)
    })
}
