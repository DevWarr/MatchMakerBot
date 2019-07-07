const variables = require("../utils/variables.js")

exports.run = (client, message, args) => {
    // Get log command
    const log = client.commands.get("log")

    // This should allow spaces and non-capitalization to still allow user setting
    const userName = args.join().toLowerCase()

    // Check if our userName matches
    const keys = Object.keys(variables.users)
    const userMatch = keys.find(
        key =>
            key !== "bot" &&
            key !== "warvdine" &&
            key.toLowerCase() === userName
    )

    // If our userName doesn't exist in our users object, we return an error
    if (!userMatch) {
        message
            .reply(
                `We don't have a user with an name of "${args.join(
                    " "
                )}". You may have typed this command incorrectly, or used the wrong name.\nUse \`?removeuser\` for help.`
            )
            .catch(log)
        log(
            `Tried to remove user name "${userName}".\nUnsuccessful; user name did not match. D:\n`
        )
        return
    }

    // If it does exists, we assign it!
    variables.users[`${userMatch}`] = ""
    message
        .reply(`Removed "${args.join()}"from the variables file. Success!`)
        .catch(log)
    log(
        `Tried to remove user name "${userName}" rom the variables file.\nAssignment successful. :D\n`
    )
}
