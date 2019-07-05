// Bring in the discord stuffs
const Discord = require ("discord.js")

// Create a new client. This is our bot!
const client = new Discord.Client()

client.on("ready", () => {
    console.log("I am ready!")
})

client.on("message", message => {
    if (message.content.startsWith("ping")) {
        message.channel.send("pong!")
    }
})

client.login("")