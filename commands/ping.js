module.exports = {
    name: 'ping',
    description: "This is a ping command",
    async execute(message, args, cmd, client, Discord) {
        message.channel.send('pong')
    }
}