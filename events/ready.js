module.exports = client => {
    const cmd = client.commands.get("ready")
    if (!cmd) return
    cmd.run()
}
