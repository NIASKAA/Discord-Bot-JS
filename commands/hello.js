module.exports = {
    name: 'hello',
    description: "Say hello to Elon",
    async execute(message, args, cmd, client, Discord) {
        message.channel.send('Helloooo')
    }
}