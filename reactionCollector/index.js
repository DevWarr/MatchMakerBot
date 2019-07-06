const fs = require("fs")

class Collector {
    constructor(msg, type, reactions) {
        this.msg = msg
        this.bot = "596597142768844811"
        this.type = type
        this.reactions = reactions
    }

    initiate() {
        switch (this.type) {
            case "MAIN_INFO": {
                const module = require("./mainInfo.js")
                this.msg.createReactionCollector((r, u) => module.run(this.bot, this.reactions, r, u))
                break
            }
            case "LOOKING": {
                const module = require("./looking.js")
                this.msg.createReactionCollector((r, u) => module.run(this.bot, this.reactions, r, u))
                break
            }
            case "CHALLENGER": {
                const module = require("./challenger.js")
                this.msg.createReactionCollector((r, u) => module.run(this.bot, this.reactions, r, u))
                break
            }
            case "MATCH_CREATED": {
                const module = require("./matchCreated.js")
                this.msg.createReactionCollector((r, u) => module.run(this.bot, this.reactions, r, u))
                break
            }
            case "MATCH_INFO": {
                const module = require("./matchInfo.js")
                this.msg.createReactionCollector((r, u) => module.run(this.bot, this.reactions, r, u))
                break
            }

            default:
                return
        }
    }
}

module.exports = Collector
