module.exports = {
    name: 'jokes',
    description: "Tell a joke",
    async execute(message, args, cmd, client, Discord) {
        const badjokes = [
            "HAMBURGER PLS",
            "Bitcoin is a joke",
            "I have no idea what to joke about bro"
        ];
        message.channel.send(badjokes[Math.floor(Math.random() * badjokes.length)]);
    }
}