const Collector = require("../reactionCollector")
const variables = require("../utils/variables.js")

const msgRemover = (channel, user1, user2 = null) => {
    const arrayWithUser = channel.messages.filter(
        message =>
            !message.mentions.users.get(variables.users.bot) &&
            (message.mentions.users.get(user1) ||
                message.mentions.users.get(user2))
    )
    arrayWithUser.forEach(msg => {
        if ([...msg.mentions.users].length <= 2)
            msg.delete().catch(console.error)
    })
}

const roleReset = (member, removers) => {
    removers.forEach(role => {
        if (member.roles.get(variables.roles[`${role}`])) {
            member.removeRole(variables.roles[`${role}`])
        }
    })
}

exports.run = (client, botId, reactions, user1, user2, reaction, user) => {
    // Some "error" handling
    if (user.id === botId) return
    if (!reaction.me) reaction.remove(user.id).catch(console.error)
    if (user.id !== user1) reaction.remove(user.id).catch(console.error)

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
    const { ok } = reactions
    // Final error check
    if (reaction.name !== ok) reaction.remove(user.id).catch(console.error)

    msgRemover(msg.channel, user1, user2)
    roleReset(member1, Object.keys(variables.roles))
    roleReset(member2, Object.keys(variables.roles))
    member1.addRole(role).catch(console.error)
    member2.addRole(role).catch(console.error)
    msg.guild.createChannel("the-matchmaker-group", {type: "category"})
    msg.channel
        .send(
            `<@${user1}> vs <@${user2}> now in progress. Please proceed to DMs if you wish to communicate.\nThe match has begun!\n\n(Thank you for using <@${
                variables.users.bot
            }>!)`
        )
        .then(msg => {
            new Collector(
                msg,
                "MATCH_CREATED",
                { user1: user1, user2: user.id },
                client
            ).initiate()
        })
        .catch(console.error)
}
