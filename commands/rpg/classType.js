const profileModel = require('../../models/profileSchema');
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'class',
    description: 'Pick your class!',
    async execute(message, args, cmd, client, Discord, profileData){
     
        const Embed = new MessageEmbed()
        .setColor("BLUE")
        .setTitle("Pick your class")
        .setDescription('(Warrior, Mage, Thief)')
        let classMsg = await message.channel.send(Embed)
        await classMsg.react('⚔️');
        await classMsg.react('🧙‍♂️');
        await classMsg.react('💰');

        const warriorReact = (reaction, user) => reaction.emoji.name === "⚔️" && user.id === message.author.id
        const mageReact = (reaction, user) => reaction.emoji.name === "🧙‍♂️" && user.id === message.author.id
        const thiefReact = (reaction, user) => reaction.emoji.name === "💰" && user.id === message.author.id

        const warrior = classMsg.createReactionCollector(warriorReact, {dispose: true})
        const mage = classMsg.createReactionCollector(mageReact, {dispose: true})
        const thief = classMsg.createReactionCollector(thiefReact, {dispose: true})

        warrior.on("collect", async(erase) => {
            erase.users.remove(message.author.id)
            if(profileData.level < 5) {
                return classMsg.edit(Embed.setColor('RED').setTitle('You need to be lvl 5 to choose a class!').setDescription(''))
            }
            if(profileData.class.includes("Mage")) {
                return classMsg.edit(Embed.setColor('RED').setTitle('You already have a class!').setDescription(''))
            }
            if(profileData.class.includes("Thief")) {
                return classMsg.edit(Embed.setColor('RED').setTitle('You already have a class!').setDescription(''))
            }
            await profileModel.findOneAndUpdate({
                userID: message.author.id
            },
            {
                $mul: {
                    damage: 1.8
                },
                $set: {
                    crit: 2
                }
            },
            {
                upsert: true
            })
            await classMsg.edit(Embed.setAuthor(`${message.author.username}`, message.author.displayAvatarURL()).setColor("GREEN").setTitle(`${message.author.id} is now a warrior!`).setThumbnail("https://imgur.com/6E34Np8.png"))
        })

        mage.on("collect", async(erase) => {
            erase.users.remove(message.author.id)
            if(profileData.level < 5) {
                return classMsg.edit(Embed.setColor('RED').setTitle('You need to be lvl 5 to choose a class!').setDescription(''))
            }
            if(profileData.class.includes("Warrior")) {
                return classMsg.edit(Embed.setColor('RED').setTitle('You already have a class!').setDescription(''))
            }
            if(profileData.class.includes("Thief")) {
                return classMsg.edit(Embed.setColor('RED').setTitle('You already have a class!').setDescription(''))
            }
            await profileModel.findOneAndUpdate({
                userID: message.author.id
            },
            {
                $mul: {
                    mDamage: 2
                },
                $set: {
                    class: 'Mage'
                }
            },
            {
                upsert: true
            })
            await classMsg.edit(Embed.setAuthor(`${message.author.username}`, message.author.displayAvatarURL()).setColor("GREEN").setDescription(`${message.author.id} is now a mage!`).setThumbnail("https://imgur.com/RiZXARx.png"))
        })

        thief.on("collect", async(erase) => {
            erase.users.remove(message.author.id)
            if(profileData.level < 5) {
                return classMsg.edit(Embed.setColor('RED').setTitle('You need to be lvl 5 to choose a class!').setDescription(''))
            }
            if(profileData.class.includes("Warrior")) {
                return classMsg.edit(Embed.setColor('RED').setTitle('You already have a class!').setDescription(''))
            }
            if(profileData.class.includes("Mage")) {
                return classMsg.edit(Embed.setColor('RED').setTitle('You already have a class!').setDescription(''))
            }
            await profileModel.findOneAndUpdate({
                userID: message.author.id
            },
            {
                $mul: {
                    damage: 1.4
                },
                $set: {
                    crit: 2,
                    class: "Thief"
                }
            },
            {
                upsert: true
            })
            await classMsg.edit(Embed.setAuthor(`${message.author.username}`, message.author.displayAvatarURL()).setColor("GREEN").setTitle(`${message.author.id} is now a thief!`).setThumbnail("https://imgur.com/NZdrAkb.png"))
        })
    }
}