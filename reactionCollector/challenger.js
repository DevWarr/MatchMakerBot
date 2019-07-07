const Collector = require("../reactionCollector")
const variables = require("../utils/variables.js")


exports.run = (client, botId, reactions, user1, user2, reaction, user) => {
    // Get commands for usage
    const roleAssign = client.commands.get("roleAssign").run
    const msgRemover = client.commands.get("msgRemover").run
    const log = client.commands.get("log")

    // Some "error" handling
    if (user.id === botId) return
    if (!reaction.me) return reaction.remove(user.id).catch(log)
    // if (user.id !== user1) return reaction.remove(user.id).catch(log)

    // Setting init values:
    // msg, member, and reactions
    const msg = reaction.message
    const member1 = client.guilds
        .get(variables.guilds.warvdineBotTesting)
        .members.get(user1)
    const member2 = client.guilds
        .get(variables.guilds.warvdineBotTesting)
        .members.get(user2)
    const role = variables.roles.inGame
    const { ok, door } = reactions
    // Final error check
    if (reaction.emoji.name !== ok)
        return reaction.remove(user.id).catch(log)

    // Alright, step one is to remove the extra messages, and set both users' roles
    msgRemover(msg.channel, user1, user2)
    roleAssign(member1, Object.keys(variables.roles), role)
    roleAssign(member2, Object.keys(variables.roles), role)

    // Then we need to create our new channel:

    // Get our users' full object so we have their username
    user1 = msg.guild.members.find(member => member.user.id === user1).user
    user2 = msg.guild.members.find(member => member.user.id === user2).user

    // To create a channel name, we shall do this!
    const channelName = `${user1.username}-vs-${user2.username}`
        .replace(/[^a-z0-9-_]/gi, "")
        .toLowerCase()

    // Our main category channel
    const channelCategory = msg.guild.channels.get(
        variables.channels.matchesGroup
    )

    let textChannel, voiceChannel
    // The voice channel
    msg.guild
        .createChannel(`voice-${channelName}`, {
            type: "voice",
            permissionOverwrites: [
                {
                    id: msg.guild.id,
                    deny: ["VIEW_CHANNEL"]
                },
                { id: user1, allow: ["VIEW_CHANNEL"] },
                { id: user2, allow: ["VIEW_CHANNEL"] },
                { id: botId, allow: ["VIEW_CHANNEL"] }
            ]
        })
        .then(
            channel => {
                voiceChannel = msg.guild.channels.get(channel.id)
                channel.setParent(channelCategory.id).catch(log)
            } // appended to the category
        )
        .catch(log)

    // The text channel
    msg.guild
        .createChannel(`${channelName}`, {
            type: "text",
            permissionOverwrites: [
                {
                    id: msg.guild.id,
                    deny: ["VIEW_CHANNEL"]
                },
                { id: user1, allow: ["VIEW_CHANNEL"] },
                { id: user2, allow: ["VIEW_CHANNEL"] },
                { id: botId, allow: ["VIEW_CHANNEL"] }
            ]
        })
        .then(
            channel => {
                textChannel = msg.guild.channels.get(channel.id)
                channel
                    .setParent(channelCategory.id)
                    // Once created, we prep our mystical message
                    .then(channel => {
                        const introMsg = `<@${user1.id}> and <@${
                            user2.id
                        }>! This is the time for you two to compete. May the best player win.\n\nWhen either of you are ready to leave, just click the door and these two channels will be deleted.\n**Remember:**`
                        const stringsArray = variables.stringArrays.matchInfo
                        const randomString =
                            stringsArray[
                                Math.floor(Math.random() * stringsArray.length)
                            ]
                        // Here we send the message, create a new collector, and react to our message
                        channel
                            .send(`${introMsg} ${randomString}`)
                            .then(msg => {
                                // Create an "info" object
                                const info = {
                                    user1: user1.id,
                                    user2: user2.id,
                                    channel1: textChannel.id,
                                    channel2: voiceChannel.id
                                }
                                new Collector(
                                    msg,
                                    "MATCH_INFO",
                                    info,
                                    client
                                ).initiate()
                                msg.react(door)
                            })
                    })
                    .catch(log)
            } // appended to the category
        )
        .catch(log)

    msg.channel
        .send(
            `<@${user1.id}> vs <@${
                user2.id
            }> now in progress at #${channelName}. Please proceed there to communicate.\nThe match has begun! \n\n(Thank you for using The MatchMaker!)`
        )
        .then(msg => {
            new Collector(
                msg,
                "MATCH_CREATED",
                { user1: user1.id, user2: user2.id },
                client
            ).initiate()
        })
        .catch(log)
}
