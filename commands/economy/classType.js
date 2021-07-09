const profileModel = require('../../models/profileSchema');
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'class',
    description: 'Pick your class!',
    async execute(message, args, cmd, client, Discord, profileData){
     
        const Embed = new MessageEmbed()
        .setColor("BLUE")
        .setTitle("Pick your class")
        .setDescription('(Warrior, Magician)')
        let classMsg = await message.channel.send(Embed)
        const filter = (user) => user.id = message.author.id
        const collector = message.channel.createMessageCollector(filter, {max: 1})

        collector.on('collect', async(m) => {
            if(m.content === "warrior" || "Warrior") {
                if(profileData.level < 5) {
                    return message.channel.send('You are not high enough level!')
                }
                await profileModel.findOneAndUpdate({
                    userID: message.author.id
                },
                {
                    $mul: {
                        damage: 1.6,
                        healthP: 1.8
                    },
                    $set: {
                        class: "Warrior"
                    }
                },
                {
                    upsert: true
                })
                classMsg.edit(Embed.setAuthor(`${message.author.username}`, message.author.displayAvatarURL()).setColor("GREEN").setTitle(`${message.author.username} is now a warrior!`).setDescription('').setThumbnail())
            } else if(m.content === "magician" || "Magician") {
                if(profileData.level < 5) {
                    return message.channel.send('You are not high enough level!')
                }
                await profileModel.findOneAndUpdate({
                    userID: message.author.id
                },
                {
                    $mul: {
                        mDamage: 2,
                        healthP: 1.4
                    },
                    $set: {
                        class: "Magician"
                    }
                },
                {
                    upsert: true
                })
                classMsg.edit(Embed.setAuthor(`${message.author.username}`, message.author.displayAvatarURL()).setColor("GREEN").setTitle(`${message.author.username} is now a magician!`).setDescription('').setThumbnail())
            }
        })

    }
}