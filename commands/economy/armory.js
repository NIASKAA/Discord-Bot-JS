const profileModel = require('../../models/profileSchema');
const weaponItem = require('../../models/weapon');
const {MessageEmbed} = require('discord.js')

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
        const weaponLevel = weaponItem.find((val) => val.name.toLowerCase() === itemToBuy).level;
        const weaponDamage = weaponItem.find((val => val.name === itemToBuy)).damage;
        const weaponImage = weaponItem.find((val) => val.name === itemToBuy).image
        let scaleDamage = weaponDamage * 1.8
        if(profileData.coins < weaponPrice) return message.reply("You don't have enough money!");
        if(profileData.level < weaponLevel) return message.reply("You are not high enough level!")
       
        
        Embed = new MessageEmbed()
        .setColor("PURPLE")
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .setTitle(`Obtained ${itemToBuy}!`)
        .setThumbnail(`${weaponImage}`)

        const params = {
            userID: message.author.id,
        }
        if(profileData.class.includes("Warrior")) {
            profileModel.findOne(params, async(err, data) => {
                await profileModel.updateMany({
                    userID: message.author.id,
                },
                {
                    $inc: {
                        coins: -weaponPrice,
                        damage: scaleDamage
                    },
                    $set: {
                        weapon: itemToBuy
                    }
                },
                {
                    upsert: true
                });
                message.channel.send(Embed)
            })
        } else {
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
                message.channel.send(Embed)
            })
        }
    }
};