const variables = require("../utils/variables.js")

exports.run = (client, message, [identity, ...props]) => {
    // Get log command
    const log = client.commands.get("log")

    // Just a safety check
    if (message.author.id !== variables.users.warvdine) return 
    let detector = null
    switch (identity) {
        case "client":
            detector = client
            break;
        case "message":
            detector = message
            break;
        default:
            return
    }
    if (!props) return log(detector)
    props.forEach(prop => {
        detector = detector[prop]
    })
    log(detector)
}
