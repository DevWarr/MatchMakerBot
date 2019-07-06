const fs = require("fs")

class Collector {
    constructor(msg) {
        this.collector = msg.createReactionCollector(
            (reaction, user) => !user.bot
        )
        this.bot = "596597142768844811"
    }

    initiate() {
        fs.readdir("./reactionCollector/", (err, files) => {
            if (err) return console.error(err)
            files.forEach(file => {
                if (file === "index.js") return
                const event = require(`./${file}`)
                const eventName = file.split(".")[0]
                this.collector.on(eventName, event.bind(null, this.collector, this.bot))
            })
        })
    }
}

module.exports = Collector
