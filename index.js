// Bring in the discord stuffs
const Discord = require("discord.js")
const fs = require("fs")
const Enmap = require("./utils/Enmap.js")

// Create a new client. This is our bot!
const client = new Discord.Client()
const config = require("./config.json")
client.config = config

//=============================EVENT IMPORTING=============================//

/*
    Working on an event, but not sure what to do? Use this console.log!
        console.log([message.author, message.channel, message.content, message.reactions])
    This should give you the main bits you need!
*/
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err)
    files.forEach(file => {
        const event = require(`./events/${file}`)
        const eventName = file.split(".")[0]
        client.on(eventName, event.bind(null, client))
        console.log(`loading event: ${eventName}...`)
    })
    console.log("All events loaded!\n")
})

//=============================COMMANDS IMPORTING=============================//

client.commands = new Enmap()

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err)
    files.forEach(file => {
        const props = require(`./commands/${file}`)
        const commandName = file.split(".")[0]
        client.commands.setNew(commandName, props)
        console.log(`loading command: ${commandName}...`)
    })
    console.log("All commands loaded!\n")
})

//=============================REQUESTS IMPORTING=============================//

client.requests = new Enmap()

fs.readdir("./requests/", (err, files) => {
    if (err) return console.error(err)
    files.forEach(file => {
        const props = require(`./requests/${file}`)
        const requestName = file.split(".")[0]
        client.requests.setNew(requestName, props)
        console.log(`loading request: ${requestName}...`)
    })
    console.log("All requests loaded!\n")
})

client.login(config.token)
