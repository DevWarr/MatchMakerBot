// Removes Matchmaking messages.
const variables = require("../utils/variables.js")

exports.run = (channel, user1, user2 = null) => {

    channel.messages.forEach(message => {
        if (
            !message.mentions.users.get(variables.users.bot) &&
            (message.mentions.users.get(user1) ||
                message.mentions.users.get(user2))
        )
            message.delete().catch(console.log)
    })
}
