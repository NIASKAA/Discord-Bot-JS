const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'sell',
    description: 'Buy something from the shop',
    async execute(message, args, cmd, client, Discord, profileData) {
        const arg = args.join(" ")
        const itemToSell = arg;

        if(itemToSell === "borgor") {
            itemPrice = 10
            await profileModel.updateMany({
                userID: message.author.id,
            },
            {
                $inc: {
                    coins: itemPrice,
                },
                $pull: {
                    inventory: itemToSell
                }
            },
            {
                upsert: true
            });
        } else if(itemToSell === "fishing rod") {
            itemPrice = 90
            await profileModel.updateMany({
                userID: message.author.id
            },
            {
                $inc: {
                    coins: itemPrice,
                },
                $pull: {
                    inventory: itemToSell
                }
            },
            {
                upsert: true
            })
        } else if(itemToSell === "civic") {
            itemPrice = 15000
            await profileModel.updateMany({
                userID: message.author.id
            },
            {
                $inc: {
                    coins: itemPrice,
                },
                $pull: {
                    inventory: itemToSell
                }
            },
            {
                upsert: true
            })
        }
    
        message.reply(`You sold ${itemToSell}`)
    }
};