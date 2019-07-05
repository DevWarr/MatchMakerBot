exports.run = client => {
    console.log("Fetching messages...")
    const botTestTwo = client.channels.find(
        channel => channel.id === "596803653055021087"
    )
    const freeBotTesting = client.channels.find(
        channel => channel.id === "596809535419711502"
    )
    botTestTwo.fetchMessages().then(messages => {
        messages.forEach(message => {
            if (!message.author.bot) {
                message.delete()
            }
        })
    })
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
