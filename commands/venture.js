const profileModel = require('../models/profileSchema');
const locations = require('../models/locations');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'venture',
    description: 'Adventure time',
    async execute(message, args, cmd, client, Discord, profileData) {
        const randomLocation = locations[Math.floor(Math.random() * locations.length)]
        const goHome = 'home'
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

        yes.on("collect", erase => {
            erase.users.remove(message.author.id);
            let newLocation = randomLocation.name
            Embed
            .setTitle('Status...')
            .setDescription(`Moved to ${randomLocation.name} with ${randomLocation.enemies} enemies`)
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
        })

        no.on("collect", erase => {
            erase.users.remove(message.author.id);
            Embed
            .setTitle('Status...')
            .setDescription("Going back home")
            .setImage('https://imgur.com/si7QsRB')
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
                        location: goHome
                    },
                },
                {
                    upsert: true
                });
            })
            
        })
    }
}