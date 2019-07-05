// Bring in the discord stuffs
const Discord = require ("discord.js")
const config = require ("./config.json")
const Enmap = require ("./utils/enmap.js")

const testEnmap = new Enmap({
    name: "Charlie",
    age: 25,
    hometown: "Lewisville"
})

console.log(testEnmap.get("name"))
console.log(testEnmap.set("age", 26))
console.log(testEnmap.set("friend", "John"))

// // Create a new client. This is our bot!
// const client = new Discord.Client()

// client.on("ready", () => {
//     console.log("I am ready!")
// })

// client.on("message", message => {
//     if (message.content.startsWith("ping")) {
//         message.channel.send("pong!")
//     }
// })

// client.login(config.token)