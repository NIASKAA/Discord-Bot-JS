module.exports = {
    name: "balance",
    description: "Check user balance",
    async execute(message, args, cmd, client, Discord, profileData) {
        message.channel.send(`Your balance is ${profileData.coins}, your bank balance is ${profileData.bank}`);
    }
}