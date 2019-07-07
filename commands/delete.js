const variables = require("../utils/variables.js")

exports.run = (client, message, args) => {

    // Just a safety check
    if (message.author.id !== variables.users.warvdine) return 

    args.forEach(channelId => {
        const channel = message.guild.channels.get(channelId)
        console.log(channelId)
        console.log(channel)
        channel.delete().catch(console.log)
    })
}
