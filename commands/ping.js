exports.run = (client, message, args) => {
    // Get log command
    const log = client.commands.get("log")

    message.channel.send("pong!").catch(log)
}
