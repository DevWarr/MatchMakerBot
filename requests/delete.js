exports.run = (client, message, args) => {
    // Get log command
    const log = client.commands.get("log")

    // Just a safety check
    if (message.author.id !== variables.users.warvdine) return

    message.channel
        .send(
            `Will delete the channel with the given id. Usage:\n\`\`\`!delete 597208734246109184\nWill delete the hannel with this id\`\`\``
        )
        .then(msg => msg.delete(7000).catch(log))
        .catch(log)
}
