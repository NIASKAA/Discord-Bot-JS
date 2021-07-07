const profileModel = require("../../models/profileSchema");
const foodItem = require("../../models/consumable");

module.exports = {
    name: 'buyFood',
    aliases: ['bf'],
    description: 'Buy food from the shop',
    async execute(message, args, cmd, client, Discord, profileData) {
        const arg = args.join(" ")

        if(!arg) return message.reply('Specify which item you want to buy brah');
        const itemToBuy = arg;

        const validFood = !!foodItem.find((val) => val.items.toLowerCase() === itemToBuy);
        if(!validFood) return message.reply('THe item is not valid')

        const foodPrice = foodItem.find((val) => val.items.toLowerCase() === itemToBuy).price;

        if(profileData.coins < foodPrice) return message.reply("You don't have enough money!");

        const params = {
            userID: message.author.id,
        }
        
        profileModel.findOne(params, async(err, data) => {
            await profileModel.updateMany({
                userID: message.author.id,
            },
            {
                $inc: {
                    coins: -foodPrice
                },
                $push: {
                    inventory: itemToBuy
                }
            },
            {
                upsert: true
            });
            message.reply(`You bought ${itemToBuy}`)
        })
    }
};