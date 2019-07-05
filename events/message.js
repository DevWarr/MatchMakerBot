module.exports = (client, message) => {
    // Message setn by bot? No action!
    if (message.author.bot) return
    console.log("message detected!")

    // What is our message prefix?
    switch (message.content[0]) {
        // command = "!"

        case client.config["command-prefix"]: {
            // Declare our args and command. Command declaration removes it from [args], so no redundancy
            const args = message.content
                .slice(client.config["command-prefix"].length)
                .trim()
                .split(/ +/g)
            const command = args.shift().toLowerCase()

            const cmd = client.commands.get(command)
            if (!cmd) return
            cmd.run(client, message, args)
            break;
        }

        // request = "?"
        case client.config["request-prefix"]: {
            // Declare our args and request. Request declaration removes it from [args], so no redundancy
            const args = message.content
                .slice(client.config["request-prefix"].length)
                .trim()
                .split(/ +/g)
            const request = args.shift().toLowerCase()

            const cmd = client.requests.get(request)
            if (!cmd) return
            cmd.run(client, message, args)
            break;
        }

        // No prefix? Do nothing!
        default:
            return
    }
}
