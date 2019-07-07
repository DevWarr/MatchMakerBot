const variables = require("../utils/variables.js")

exports.run = (client, message, args) => {
    message.channel.send(
        `It would be very difficult to tell the bot to switch channels. It would need to delete messages from it's current channel and essentially restart on the new channel. Because of this, if you wish to change any channel Ids, please update and restart the bot. Thank you!`
    )
}
