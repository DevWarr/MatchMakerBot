const fs = require("fs")
const variables = require("../utils/variables.js")

class Collector {
    constructor(msg, type, { user1 = null, user2 = null, channel1 = null, channel2 = null }, client) {
        this.msg = msg
        this.bot = variables.users.bot
        this.type = type
        this.user1 = user1
        this.user2 = user2
        this.channel1 = channel1
        this.channel2 = channel2
        this.reactions = variables.reactions
        this.client = client
    }

    initiate() {
        console.log("\n\nCreating new collector:")
        console.log(`\nmsg: ${this.msg}`)
        console.log(`\nbot: ${this.bot}`)
        console.log(`\nbot: ${this.bot}`)
        console.log(`\ntype: ${this.type}`)
        console.log(`\nuser1: ${this.user1}`)
        console.log(`\nuser2: ${this.user2}`)
        console.log(`\nchannel1: ${this.channel1}`)
        console.log(`\nchannel2: ${this.channel2}`)
        console.log(`\n\n`)
        switch (this.type) {
            case "MAIN_INFO": {
                const module = require("./mainInfo.js")
                this.msg.createReactionCollector((r, u) =>
                    module.run(this.client, this.bot, this.reactions, r, u)
                )
                break
            }
            case "LOOKING": {
                const module = require("./looking.js")
                this.msg.createReactionCollector((r, u) =>
                    module.run(
                        this.client,
                        this.bot,
                        this.reactions,
                        this.user1,
                        r,
                        u
                    )
                )
                break
            }
            case "CHALLENGER": {
                const module = require("./challenger.js")
                this.msg.createReactionCollector((r, u) =>
                    module.run(
                        this.client,
                        this.bot,
                        this.reactions,
                        this.user1,
                        this.user2,
                        r,
                        u
                    )
                )
                break
            }
            case "MATCH_CREATED": {
                const module = require("./matchCreated.js")
                this.msg.createReactionCollector((r, u) =>
                    module.run(
                        this.client,
                        this.bot,
                        this.reactions,
                        this.user1,
                        this.user2,
                        r,
                        u
                    )
                )
                break
            }
            case "MATCH_INFO": {
                const module = require("./matchInfo.js")
                this.msg.createReactionCollector((r, u) =>
                    module.run(
                        this.client,
                        this.bot,
                        this.reactions,
                        {user1: this.user1,
                        user2: this.user2,
                        channel1: this.channel1,
                        channel2: this.channel2},
                        r,
                        u
                    )
                )
                break
            }

            default:
                return
        }
    }
}

module.exports = Collector
