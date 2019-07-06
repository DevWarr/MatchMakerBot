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
                        this.user1,
                        this.user2,
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
