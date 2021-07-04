const profileModel = require('../models/profileSchema');
const items = require('../models/shopItems');

module.exports = {
    name: 'buy',
    description: 'Buy something from the shop',
    async execute(message, args, cmd, client, Discord, profileData) {
        const arg = args.join(" ")
        if(!arg) return message.reply('Specify which item you want to buy brah');
        const itemToBuy = arg;

        const validItem = !!items.find((val) => val.item.toLowerCase() === itemToBuy);
        if(!validItem) return message.reply('The item is not valid');

        const itemPrice = items.find((val) => val.item.toLowerCase() === itemToBuy).price;

        
        if(profileData.coins < itemPrice) return message.reply("You don't have enough money!");

        const params = {
            userID: message.author.id,
            serverID: message.guild.id
        }
        profileModel.findOne(params, async(err, data) => {
            await profileModel.updateMany({
                userID: message.author.id,
            },
            {
                $inc: {
                    coins: -itemPrice,
                },
                $push: {
                    inventory: itemToBuy
                }
            },
            {
                upsert: true
            }
            );
            
            message.reply(`You bought ${itemToBuy}`)
        })
    }
};