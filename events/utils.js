const profileModel = require('../models/profileSchema')
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const warriorAI = require('../commands/rpg/warriorAI');
const mageAI = require("../commands/rpg/mageAI");
const thiefAI = require('../commands/rpg/thiefAI');
module.exports = {
    fightAgain,
}

async function fightAgain(message, args, cmd, client, Discord, profileData) {
    const goTown = 'town'
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
                await warriorAI.run(message, args, cmd, client, Discord, profileData)
            } else  if(profileData.class == "Mage") {
                await mageAI.run(message, args, cmd, client, Discord, profileData)
            } else if(profileData.class == "Thief") {
                await thiefAI.run(message, args, cmd, client, Discord, profileData)
            }
        })

        no.on("collect", async (erase) => {
            erase.users.remove(message.author.id);
            Embed = new MessageEmbed()
            .setTitle('Status...')
            .setColor("YELLOW")
            .setDescription("Going back to town")
            .setImage('https://imgur.com/KOYoNfA.png')
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
                        location: goTown
                    },
                },
                {
                    upsert: true
                });
            })
            
        })
}
