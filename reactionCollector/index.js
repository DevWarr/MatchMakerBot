const fs = require("fs")

class Collector {
    constructor(msg, type) {
        this.msg = msg
        this.bot = "596597142768844811"
        this.type = type
    }

    initiate() {
        switch (this.type) {
            case "MAIN_INFO": {
                const module = require("./mainInfo.js")
                this.msg.createReactionCollector(module.run)
                break
            }
            case "LOOKING": {
                const module = require("./looking.js")
                this.msg.createReactionCollector(module.run)
                break
            }
            case "CHALLENGER": {
                const module = require("./challenger.js")
                this.msg.createReactionCollector(module.run)
                break
            }
            case "MATCH_CREATED": {
                const module = require("./matchCreated.js")
                this.msg.createReactionCollector(module.run)
                break
            }
            case "MATCH_INFO": {
                const module = require("./matchInfo.js")
                this.msg.createReactionCollector(module.run)
                break
            }

            default:
                return
        }
    }
}

module.exports = Collector
