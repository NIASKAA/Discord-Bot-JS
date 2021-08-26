const profileModel = require('../../models/profileSchema')
const {MessageEmbed} = require('discord.js')
const {locations} = require('../../models/victoriaIsland');
const encounterShop = require('./encounterShop');
const thiefMaple = require('../maplerpg/thiefMaple')

module.exports = {
    name: "exploreMaple",
    aliases: ["ex"],
    description: "explore victoria island!",
    async execute(message, args, cmd, client, Discord, profileData) {
        const shopChance = Math.random()
        const encounterEnemy = Math.random()
        let shopChanceRate = 0.1
        let enemyEncounterRate = 1
        const question = "Where would you like to go?"
        const Embed = new MessageEmbed()
        .setColor("RED")
        .setDescription(question)
        .setImage("https://imgur.com/tBwFQMb.png")
        .setFooter('Use reactions to move!')
        let msg = await message.channel.send(Embed)

        await msg.react('⬅️');
        await msg.react('➡️');

        const leftReact = (reaction, user) => reaction.emoji.name === '⬅️' && user.id === message.author.id;
        const rightReact = (reaction, user) => reaction.emoji.name === '➡️' && user.id === message.author.id;

        const left = msg.createReactionCollector(leftReact, {dispose: true})
        const right = msg.createReactionCollector(rightReact, {dispose: true})

        left.on("collect", async(erase) => {
            erase.users.remove(message.author.id)
            if(shopChance < shopChanceRate) {
                await encounterShop.run(message, args, cmd, client, Discord, profileData)
            } else {
                moveLeft = locations => locations.unshift(locations.pop());
                moveLeft(locations);
                console.log(locations)
                let newLocation = locations.find(val => val.name).name
                let newLocationImage = locations.find(val => val.name).image
                msg.edit(Embed.setColor("ORANGE").setTitle(`Moved to ${newLocation}`).setImage(`${newLocationImage}`))
                params = {
                    userID: message.author.id,
                }
                profileModel.findOne(params, async(err, data) => {
                    await profileModel.updateMany({
                        userID: message.author.id,
                    },
                    {
                        $set: {
                            mapleLocation: newLocation
                        },
                    },
                    {
                        upsert: true
                    });
                })
                if(encounterEnemy < enemyEncounterRate) {
                    if(profileData.class == "Thief") {
                        thiefMaple.run(message, args, cmd, client, Discord, profileData)
                    }
                }
            }
        })

        right.on("collect", async (erase) => {
            erase.users.remove(message.author.id)
            if(shopChance < shopChanceRate) {
                shop.run(message, args, cmd, client, Discord, profileData)
            } else {
                moveRight = locations => locations.push(locations.shift());
                moveRight(locations);
                console.log(locations)
                let newLocation = locations.find(val => val.name).name
                let newLocationImage = locations.find(val => val.name).image
                msg.edit(Embed.setColor("ORANGE").setTitle(`Moved to ${newLocation}`).setImage(`${newLocationImage}`))
                params = {
                    userID: message.author.id,
                }
                profileModel.findOne(params, async(err, data) => {
                    await profileModel.updateMany({
                        userID: message.author.id,
                    },
                    {
                        $set: {
                            mapleLocation: newLocation
                        },
                    },
                    {
                        upsert: true
                    });
                })
                if(encounterEnemy < enemyEncounterRate) {
                    thiefMaple.run(message, args, cmd, client, Discord, profileData)
                }
            }
        })
    }
}