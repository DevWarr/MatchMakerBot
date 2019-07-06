exports.run = (client, message, args) => {
    // Just a safety check
    if (message.author.id !== variables.users.warvdine) return

    message.channel
        .send(
            `Will delete the channel with the given id. Usage:\n\`\`\`!delete 597208734246109184\nWill delete the hannel with this id\`\`\``
        )
        .then(msg => msg.delete(7000))
}
