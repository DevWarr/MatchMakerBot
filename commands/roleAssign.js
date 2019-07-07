const variables = require("../utils/variables.js")

exports.run = (member, removers, role) => {

    removers.forEach(roleRemove => {
        if (variables.roles[`${roleRemove}`] !== role) {
            member.removeRole(variables.roles[`${roleRemove}`]).catch(console.log)
        } else member.addRole(role).catch(console.log)
    })
}
