exports.run = client => {
    console.log("Fetching messages...")
    const matchmaking = client.channels.find(
        channel => channel.id === "596803653055021087"
    )
    matchmaking
        .fetchMessages()
        .then(messages => {
            messages.forEach(message => message.delete())
        })
        .then(() => {
            const ping = "🔔"
            const noPing = "🔕"
            matchmaking
                .send(
                    `Click on an emoji to determine your status!\n\n${ping} to receive pings\n${noPing} to receive _no_ pings\nTest it out!`
                )
                .then(msg => {
                    msg.react(ping)
                    msg.react(noPing)
                })
        })
        .catch(console.error)

    const freeBotTesting = client.channels.find(
        channel => channel.id === "596809535419711502"
    )
    freeBotTesting.fetchMessages().then(messages => {
        messages.forEach(message => {
            if (!message.author.bot) {
                message.delete()
            }
        })
    })

    console.log("Messages fetched!")
    console.log("I am ready!")
}
