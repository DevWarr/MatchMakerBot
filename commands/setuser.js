const variables = require("../utils/variables.js")

exports.run = (client, message, args) => {
    // Get log command
    const log = client.commands.get("log")

    // This should allow spaces and non-capitalization to still allow user setting
    const userId = args.pop()
    const userName = args.join().toLowerCase()

    // We need to check whether our given user value is valid before we set it
    if (!message.guild.members.get(userId)) {
        message
            .reply(
                `We don't have a user with an Id value of "${userId}". You may have typed this command incorrectly, or used the wrong Id.\nUse \`?setuser\` for help.`
            )
            .catch(log)
        log(
            `Tried to set user name "${userName}" with Id "${userId}".\nUnsuccessful; no user Id found. D:\n`
        )
        return
    }

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
                )}". You may have typed this command incorrectly, or used the wrong name.\nUse \`?setuser\` for help.`
            )
            .catch(log)
        log(
            `Tried to set user name "${userName}" with Id "${userId}".\nUnsuccessful; user name did not match. D:\n`
        )
        return
    }

    // If it does exists, we assign it!
    variables.users[`${userMatch}`] = userId
    message
        .reply(`Assigned "${args.join()}" with the Id of "${userId}". Success!`)
        .catch(log)
    log(
        `Tried to set user name "${userName}" with Id "${userId}".\nAssignment successful. :D\n`
    )
}
