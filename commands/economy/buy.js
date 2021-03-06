const profileModel = require('../../models/profileSchema');
const itemList = require('../../models/shopItems');
const {MessageEmbed} = require('discord.js')

module.exports = {
    name: 'buy',
    description: 'Buy something from the shop',
    async execute(message, args, cmd, client, Discord, profileData) {
        const arg = args.join(" ")
        const arg1 = args.join(" ")
        if(!arg) return message.reply('Specify which item you want to buy brah');
        const itemToBuy = arg;

        const validItem = !!itemList.find((val) => val.item.toLowerCase() === itemToBuy);
        if(!validItem) return message.reply('The item is not valid');

        const itemPrice = itemList.find((val) => val.item.toLowerCase() === itemToBuy).price;
        const itemImage = itemList.find((val) => val.item.toLowerCase() === itemToBuy).image;

        if(profileData.coins < itemPrice) return message.reply("You don't have enough money!");

        Embed = new MessageEmbed()
        .setColor("PURPLE")
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .setTitle(`Obtained ${itemToBuy}!`)
        .setThumbnail(`${itemImage}`)
        
        const params = {
            userID: message.author.id,
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
            });
            
            message.channel.send(Embed)
        })
    }
};