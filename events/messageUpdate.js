module.exports = (client, oldMessage, newMessage) => {
    // ONLY listen for message updates if the updates are within
    // "bot-test-two" or "free-bot-testing"
    console.log("message update detected!")
    if (
        oldMessage.channel.name !== "bot-test-two" ||
        newMessage.channel.name !== "bot-test-two" ||
        oldMessage.channel.name !== "free-bot-testing" ||
        newMessage.channel.name !== "free-bot-testing"
    )
        return

    console.log(newMessage.reactions)
}
