const profileModel = require('../models/profileSchema')
const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const battleAI = require('../commands/rpg/battleAI');
module.exports = {
    fightAgain,
}

function fightAgain(message, args, cmd, client, Discord, profileData) {
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
            await battleAI.run(message, args, cmd, client, Discord, profileData)
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
