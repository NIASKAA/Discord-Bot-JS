const profileModel = require('../models/profileSchema')
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const warrior = require('../commands/rpg/warriorAI');
const mage = require('../commands/rpg/mageAI')
const battleAI = require('../commands/rpg/battleAI')
const thiefMaple = require('../commands/maplerpg/thiefMaple')

module.exports = {
    fightAgain,
    mapleAgain,
}

async function fightAgain(message, args, cmd, client, Discord, profileData) {
    const goHome = 'home'
    EmbedFight = new MessageEmbed()
    .setColor("YELLOW")
    .setTitle('Fight again?')
    let askMsg = await message.channel.send(EmbedFight)
    
    await askMsg.react('✅');
    await askMsg.react('❌');

    const yesReact = (reaction, user) => reaction.emoji.name === "✅" && user.id === message.author.id;
    const noReact = (reaction, user) => reaction.emoji.name === "❌" && user.id === message.author.id;
        
    const yes = askMsg.createReactionCollector(yesReact, {time: 900000, dispose: true});
    const no = askMsg.createReactionCollector(noReact, {time: 900000, dispose: true});

        yes.on("collect", async (erase) => {
            erase.users.remove(message.author.id);
            askMsg.edit(EmbedFight.setTitle('Status...').setDescription(`Searching for enemy...`))
            if(profileData.class == "Warrior") {
                await warrior.run(message, args, cmd, client, Discord, profileData)
            } else if(profileData.class == "Mage") {
                await mage.run(message, args, cmd, client, Discord, profileData)
            } else if(profileData.class == "Thief") {
                await battleAI.run(message, args, cmd, client, Discord, profileData)
            }
        })

        no.on("collect", async (erase) => {
            erase.users.remove(message.author.id);
            Embed = new MessageEmbed()
            .setTitle('Status...')
            .setColor("YELLOW")
            .setDescription("Going back home")
            .setImage('https://imgur.com/si7QsRB.png')
            await message.channel.send(Embed)
            params = {
                userID: message.author.id,
            }
            profileModel.findOne(params, async(err, data) => {
                await profileModel.updateMany({
                    userID: message.author.id,
                },
                {
                    $set: {
                        location: goHome
                    },
                },
                {
                    upsert: true
                });
            })
            
        })
}


async function mapleAgain(message, args, cmd, client, Discord, profileData) {
    EmbedFight = new MessageEmbed()
    .setColor("YELLOW")
    .setTitle('Fight again?')
    let askMsg = await message.channel.send(EmbedFight)
    
    await askMsg.react('✅');
    await askMsg.react('❌');

    const yesReact = (reaction, user) => reaction.emoji.name === "✅" && user.id === message.author.id;
    const noReact = (reaction, user) => reaction.emoji.name === "❌" && user.id === message.author.id;
        
    const yes = askMsg.createReactionCollector(yesReact, {time: 900000, dispose: true});
    const no = askMsg.createReactionCollector(noReact, {time: 900000, dispose: true});

        yes.on("collect", async (erase) => {
            erase.users.remove(message.author.id);
            askMsg.edit(EmbedFight.setTitle('Status...').setDescription(`Searching for enemy...`))
            if(profileData.class == "Warrior") {
                await warrior.run(message, args, cmd, client, Discord, profileData)
            } else if(profileData.class == "Mage") {
                await mage.run(message, args, cmd, client, Discord, profileData)
            } else if(profileData.class == "Thief") {
                await thiefMaple.run(message, args, cmd, client, Discord, profileData)
            }
        })

        no.on("collect", async (erase) => {
            erase.users.remove(message.author.id);
            Embed = new MessageEmbed()
            .setTitle('Status...')
            .setColor("YELLOW")
            .setDescription("Going back home")
            .setImage('https://imgur.com/si7QsRB.png')
            await message.channel.send(Embed)
            params = {
                userID: message.author.id,
            }
            profileModel.findOne(params, async(err, data) => {
                await profileModel.updateMany({
                    userID: message.author.id,
                },
                {
                    $set: {
                        mapleLocation: ''
                    },
                },
                {
                    upsert: true
                });
            })
            
        })
}