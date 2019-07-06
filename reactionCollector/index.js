const fs = require("fs")

class Collector {
    constructor(msg, type, { user1 = null, user2 = null, ...msgInfo }) {
        this.msg = msg
        this.bot = "596597142768844811"
        this.type = type
        this.user1 = user1
        this.user2 = user2
        this.msgInfo = msgInfo
    }

    initiate() {
        switch (this.type) {
            case "MAIN_INFO": {
                const module = require("./mainInfo.js")
                this.msg.createReactionCollector((r, u) =>
                    module.run(this.bot, this.msgInfo, r, u)
                )
                break
            }
            case "LOOKING": {
                const module = require("./looking.js")
                this.msg.createReactionCollector((r, u) =>
                    module.run(this.bot, this.msgInfo, this.user1, r, u)
                )
                break
            }
            case "CHALLENGER": {
                const module = require("./challenger.js")
                this.msg.createReactionCollector((r, u) =>
                    module.run(
                        this.bot,
                        this.msgInfo,
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
                        this.bot,
                        this.msgInfo,
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
                        this.bot,
                        this.msgInfo,
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