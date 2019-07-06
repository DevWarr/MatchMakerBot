module.exports = (client, message) => {
    // Message setn by bot? No action!
    if (message.author.bot) return
    console.log("New message detected!")

    // Message by a user in a bot only channel? Get em out!
    if (
        !message.author.bot &&
        (message.channel.id === "596803653055021087" ||
            message.channel.id === "596809535419711502")
    ) {
        message
            .delete()
            .then(deletedMsg =>
                deletedMsg.channel
                    .send(
                        `<@${
                            deletedMsg.author.id
                        }> Please keep this channel bot only. Thank you!`
                    )
                    .then(sentMsg => sentMsg.delete(5000))
            )
    }

    // What is our message prefix?
    switch (message.content[0]) {
        // command = "!"
        case client.config.command: {
            // Declare our args and command. Command declaration removes it from [args], so no redundancy
            const args = message.content
                .slice(client.config.command.length)
                .trim()
                .split(/ +/g)
            const command = args.shift().toLowerCase()

            const cmd = client.commands.get(command)
            if (!cmd) return
            cmd.run(client, message, args)
            break
        }

        // request = "?"
        case client.config.request: {
            // Declare our args and request. Request declaration removes it from [args], so no redundancy
            const args = message.content
                .slice(client.config.request.length)
                .trim()
                .split(/ +/g)
            const request = args.shift().toLowerCase()

            const cmd = client.requests.get(request)
            if (!cmd) return
            cmd.run(client, message, args)
            break
        }

        // No prefix? Do nothing!
        default:
            return
    }
}
