const variables = require("../utils/variables.js")

exports.run = (member, removers, role) => {
    // Get log command
    const log = client.commands.get("log")

    removers.forEach(roleRemove => {
        if (variables.roles[`${roleRemove}`] !== role) {
            member.removeRole(variables.roles[`${roleRemove}`]).catch(log)
        } else member.addRole(role).catch(log)
    })
}
