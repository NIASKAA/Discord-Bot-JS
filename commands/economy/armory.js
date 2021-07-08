const profileModel = require('../../models/profileSchema');
const weaponItem = require('../../models/weapon');

module.exports = {
    name: 'armory',
    description: 'Buy weapon from the shop',
    async execute(message, args, cmd, client, Discord, profileData) {
        const arg = args.join(" ")

        if(!arg) return message.reply('Specify which item you want to buy brah');
        const itemToBuy = arg;

        const validWeapon = !!weaponItem.find((val) => val.name.toLowerCase() === itemToBuy);
        if(!validWeapon) return message.reply('THe item is not valid')

        const weaponPrice = weaponItem.find((val) => val.name.toLowerCase() === itemToBuy).price;
        const weaponDamage = weaponItem.find((val => val.name === itemToBuy)).damage;
        if(profileData.coins < weaponPrice) return message.reply("You don't have enough money!");

        const params = {
            userID: message.author.id,
        }
        
        profileModel.findOne(params, async(err, data) => {
            await profileModel.updateMany({
                userID: message.author.id,
            },
            {
                $inc: {
                    coins: -weaponPrice,
                    damage: weaponDamage
                },
                $set: {
                    weapon: itemToBuy
                }
            },
            {
                upsert: true
            });
            message.reply(`You bought ${itemToBuy}`)
        })
    }
};