const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'daily',
    cooldown: 84000,
    description: 'claim your daily money',
    async execute(message, args, cmd, client, Discord, profileData) {
        const DailyCoins = Math.floor(Math.random() * 1000) + 1;
        const response = await profileModel.findOneAndUpdate({
            userID: message.author.id,
        },
        {
            $inc: {
                coins: DailyCoins,
            }
        });
        return message.channel.send(`${message.author.username} got ${DailyCoins} from dailies!`);
    }
}