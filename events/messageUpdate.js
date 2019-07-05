module.exports = (client, omsg, nmsg) => {
    // ONLY listen for message updates if the updates are within
    // "bot-test-two" or "free-bot-testing"
    console.log("message update detected!")
    if (
        omsg.channel.name !== "bot-test-two" ||
        nmsg.channel.name !== "bot-test-two" ||
        omsg.channel.name !== "free-bot-testing" ||
        nmsg.channel.name !== "free-bot-testing"
    )
        return

    console.log(nmsg.reactions)
}
