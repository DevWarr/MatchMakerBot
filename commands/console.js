const variables = require("../utils/variables.js")

exports.run = (client, message, [identity, ...props]) => {

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
    if (!props) return console.log(detector)
    props.forEach(prop => {
        detector = detector[prop]
    })
    console.log(detector)
}
