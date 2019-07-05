// Bring in the discord stuffs
const Discord = require("discord.js")
const fs = require("fs")
const Enmap = require("./utils/enmap.js")

// Create a new client. This is our bot!
const client = new Discord.Client()
const config = require("./config.json")
client.config = config

fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err)
    files.forEach(file => {
        const event = require(`./events/${file}`)
        const eventName = file.split(".")[0]
        client.on(eventName, event.bind(null, client))
    })
})

client.commands = new Enmap()

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err)
    files.forEach(file => {
        const props = require(`./commands/${file}`)
        const commandName = file.split(".")[0]
        client.commands.setNew(commandName, props)
    })
})

client.on("message", message => {
    if (message.content.startsWith("ping")) {
        message.channel.send("pong!")
    }
})

client.login(config.token)
