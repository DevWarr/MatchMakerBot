const variables = require("../utils/variables.js")

exports.run = (client, message, args) => {
    // Get log command
    const log = client.commands.get("log")

    // This should allow spaces and non-capitalization to still allow role setting
    const roleId = args.pop()
    const roleName = args.join().toLowerCase()

    // We need to check whether our given role value is valid before we set it
    if (!message.guild.roles.get(roleId)) {
        message
            .reply(
                `We don't have a role with an Id value of "${roleId}". You may have typed this command incorrectly, or used the wrong Id.\nUse \`?setrole\` for help.`
            )
            .catch(log)
        log(
            `Tried to set role name "${roleName}" with Id "${roleId}".\nUnsuccessful; no role Id found. D:\n`
        )
        return
    }

    // Check if our roleName matches
    const keys = Object.keys(variables.roles)
    const roleMatch = keys.find(key => key.toLowerCase() === roleName)

    // If our roleName doesn't exist in our roles object, we return an error
    if (!roleMatch) {
        message
            .reply(
                `We don't have a role with an name of "${args.join(
                    " "
                )}". You may have typed this command incorrectly, or used the wrong name.\nUse \`?setrole\` for help.`
            )
            .catch(log)
        log(
            `Tried to set role name "${roleName}" with Id "${roleId}".\nUnsuccessful; role name did not match. D:\n`
        )
        return
    }

    // If it does exists, we assign it!
    variables.roles[`${roleMatch}`] = roleId
    message
        .reply(`Assigned "${args.join()}" with the Id of "${roleId}". Success!`)
        .catch(log)
    log(
        `Tried to set role name "${roleName}" with Id "${roleId}".\nAssignment successful. :D\n`
    )
}
