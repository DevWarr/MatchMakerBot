// Bring in the discord stuffs
const Discord = require("discord.js")
const fs = require("fs")
const Enmap = require("./utils/Enmap.js")

// Create a new client. This is our bot!
const client = new Discord.Client()
const variables = require("./utils/variables.js")
client.config = variables.prefixes

//=============================TIME DISPLAY=============================//

const getDateTime = () => {
    const date = new Date();
    let sec = date.getSeconds()
    sec = sec < 10 ? `0${sec}` : `${sec}`
    let min = date.getMinutes()
    min = min < 10 ? `0${min}` : `${min}`
    let hour = date.getHours()
    hour = hour < 10 ? `0${hour}` : `${hour}`
    let day = date.getDate()
    day = day < 10 ? `0${day}` : `${day}`
    let month = date.getMonth()
    month = month < 10 ? `0${month}` : `${month}`
    let year = date.getFullYear()
    return `${year}:${month}:${day} ${hour}:${min}:${sec}  `
}

const log = (message) => {
    console.log(`${getDateTime()} ${message}`)
}

//=============================EVENT IMPORTING=============================//

/*
    Working on an event, but not sure what to do? Use this console.log!
        console.log([message.author, message.channel, message.content, message.reactions])
    This should give you the main bits you need!
*/
fs.readdir("./events/", (err, files) => {
    if (err) return log(err)
    files.forEach(file => {
        const event = require(`./events/${file}`)
        const eventName = file.split(".")[0]
        client.on(eventName, event.bind(null, client))
        log(`loading event: ${eventName}...`)
    })
    log("All events loaded!\n")
})

//=============================COMMANDS IMPORTING=============================//

client.commands = new Enmap()

fs.readdir("./commands/", (err, files) => {
    if (err) return log(err)
    files.forEach(file => {
        const props = require(`./commands/${file}`)
        const commandName = file.split(".")[0]
        client.commands.setNew(commandName, props)
        log(`loading command: ${commandName}...`)
    })
    client.commands.setNew("log", log)
    log("All commands loaded!\n")
})

//=============================REQUESTS IMPORTING=============================//

client.requests = new Enmap()

fs.readdir("./requests/", (err, files) => {
    if (err) return log(err)
    files.forEach(file => {
        const props = require(`./requests/${file}`)
        const requestName = file.split(".")[0]
        client.requests.setNew(requestName, props)
        log(`loading request: ${requestName}...`)
    })
    log("All requests loaded!\n")
})


// CHANGE THIS BEFORE HEROKU LAUNCH
const token = require("./token.json")
client.login(token.token)

// client.login(process.env.token)