exports.run = (client, message, args) => {
    // Just a safety check
    if (message.author.id !== variables.users.warvdine) return

    message.channel
        .send(
            'Logs specified values to the console. For example:\n```!console client channels\nSame as typing\nconsole.log(client.channels)```\nOr:\n```!console message author username\nSame as typing\nconsole.log(message.author.username)```\nThis only works if the word immediately after `!console` is either "client" or "message", and any following properties are separated by a space.'
        )
        .then(msg => msg.delete(7000))
}
