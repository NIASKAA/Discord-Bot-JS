const profileModel = require('../../models/profileSchema');
const locations = require('../../models/locations');
const { MessageEmbed } = require('discord.js');
const battleAI = require('../rpg/battleAI');
module.exports = {
    name: 'venture',
    description: 'Adventure time',
    async execute(message, args, cmd, client, Discord, profileData) {
        if(profileData.healthP < 0) {
            return message.channel.send('Bro your health is like almost 0. Go heal up.')
        }
        if(profileData.weapon.length === 0) {
            return message.channel.send("Bruh, get a weapon")
        }
        const randomLocation = locations[Math.floor(Math.random() * locations.length)]
        const goTown = 'town'
        const Embed = new MessageEmbed()
        .setColor("YELLOW")
        .setDescription(`Will you venture into ${randomLocation.name}?`)
        let msg = await message.channel.send(Embed)

        await msg.react('✅');
        await msg.react('❌');

        const yesReact = (reaction, user) => reaction.emoji.name === "✅" && user.id === message.author.id;
        const noReact = (reaction, user) => reaction.emoji.name === "❌" && user.id === message.author.id;
        
        const yes = msg.createReactionCollector(yesReact, {time: 900000, dispose: true});
        const no = msg.createReactionCollector(noReact, {time: 900000, dispose: true});

        yes.on("collect", async (erase) => {
            erase.users.remove(message.author.id);
            let newLocation = randomLocation.name
            Embed
            .setTitle('Status...')
            .setDescription(`Moved to ${randomLocation.name}.`)
            .setImage(`${randomLocation.image}`)
            msg.edit(Embed)
            params = {
                userID: message.author.id,
            }
            profileModel.findOne(params, async(err, data) => {
                await profileModel.updateMany({
                    userID: message.author.id,
                },
                {
                    $set: {
                        location: newLocation
                    },
                },
                {
                    upsert: true
                });
            })
            await battleAI.run(message, args, cmd, client, Discord, profileData);
        })

        no.on("collect", erase => {
            erase.users.remove(message.author.id);
            Embed
            .setTitle('Status...')
            .setDescription("Going back to town")
            .setImage('https://imgur.com/KOYoNfA.png')
            msg.edit(Embed)
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
}