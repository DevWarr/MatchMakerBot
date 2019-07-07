exports.run = (client, message, args) => {
    message.channel.send(
        `The \`removeuser\` command allows you to remove a user Id for a specified user.\n\`\`\`\n!removeuser userName\n\`\`\`This will search the bot's "variables" file and reset a user's value to "". If you want to remove a user from having special bot control, this will allow you to do so without restarting the bot!\n\n(Worth noting, you should probably update and restart the bot.)\n\n**userNames:**\n- bot(unchangeable)\n- WarVDine(Bot creator, unchangeable)\n- admin(changeable)\nYes, only the admin user id can be changed. Furthermore, the admin and WarVDine are the ONLY two users who can use these special commands. **_Use at your own risk._**`
    )
}
