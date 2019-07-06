exports.run = (client, message, args) => {
    message.channel.send("**!ping** Returns the word 'pong!'").catch(console.error)
}
