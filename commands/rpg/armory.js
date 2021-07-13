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
        const weaponMagic = weaponItem.find((val) => val.name === itemToBuy).mDamage;
        const weaponImage = weaponItem.find((val) => val.name === itemToBuy).image
        let scalePDamage = weaponDamage * 1.8
        let scaleTDamage = weaponDamage * 1.4
        let scaleMDamage = weaponDamage * 2
        if(profileData.coins < weaponPrice) return message.reply("You don't have enough money!");
        if(profileData.level < weaponLevel) return message.reply("You are not high enough level!")
        if(profileData.weapon.includes(itemToBuy)) return message.reply("You already own this weapon!")
        
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
                        damage: scalePDamage
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
        if(profileData.class.includes("Mage")){
            profileModel.findOne(params, async(err, data) => {
                await profileModel.updateMany({
                    userID: message.author.id,
                },
                {
                    $inc: {
                        coins: -weaponPrice,
                        damage: scaleMDamage
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
        if(profileData.class.includes("Thief")){
            profileModel.findOne(params, async(err, data) => {
                await profileModel.updateMany({
                    userID: message.author.id,
                },
                {
                    $inc: {
                        coins: -weaponPrice,
                        damage: scaleTDamage
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