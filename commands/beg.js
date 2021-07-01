const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'beg',
    cooldown: 10000,
    description: "Beg for money cause you broke af",
    async execute(message, args, cmd, client, Discord, profileData) {
        const randomNumber = Math.floor(Math.random() * 200) + 1;
        const response = await profileModel.findOneAndUpdate({
            userID: message.author.id,
        },
        {
            $inc: {
                coins: randomNumber, 
            }
        });
        return message.channel.send(`${message.author.id} begged and received ${randomNumber}`);
    },
};