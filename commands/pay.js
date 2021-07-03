const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'pay',
    description: 'Pay someone some money',
    async execute(message, args, cmd, client, Discord, profileData) {
        let user = message.mentions.users.first()
        let amount = args[1]
        if(!user) {
            return message.channel.send('You need to tell me who to pay at least bruh');
        }
        if(profileData.coins < 0) {
            return message.channel.send(`${user} is broke af and don't have anything left to pay`)
        }
        try{
            await profileModel.findOneAndUpdate({
                userID: user.id,
            },
            {
                $inc: {
                    coins: amount
                }
            });
            await profileModel.findOneAndUpdate({
                userID: message.author.id
            },
            {
                $inc: {
                    coins: -amount
                }
            });
        } catch(err) {
            console.log(err);
        }
        message.channel.send(`You gave ${user} ${amount} coins`);
    }
}