const profileModel = require('../../models/profileSchema');
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'class',
    description: 'Pick your class!',
    async execute(message, args, cmd, client, Discord, profileData){
     
        const Embed = new MessageEmbed()
        .setColor("BLUE")
        .setTitle("Pick your class")
        .setDescription('(Warrior, Mage)')
        let classMsg = await message.channel.send(Embed)
        const filter = (user) => user.id = message.author.id
        const collector = message.channel.createMessageCollector(filter, {max: 1})

        collector.on('collect', async(m) => {
            if(m.content === "warrior" || "Warrior") {
                if(profileData.level < 5) {
                    return message.channel.send('You are not high enough level!')
                }
                if(profileData.class.includes('Magician')) {
                    revert = {
                        $divide: [
                            "$mDamage", 2
                        ]
                    }
                    multi = {
                        $multiply: [
                            "$damage", 1.6,
                        ]
                    }
                    health = {
                        $multiply: [
                            "$healthP", 1.8
                        ]
                    }
                    changes = [{
                        $set: {
                            mDamage: revert,
                            damage: multi,
                            healthP: health,
                            class: "Warrior"
                        }
                    }]
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id
                    }, changes)
                }else {
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
                    classMsg.edit(Embed.setAuthor(`${message.author.username}`, message.author.displayAvatarURL()).setColor("GREEN").setTitle(`${message.author.username} is now a warrior!`).setDescription('').setThumbnail("https://imgur.com/lxwyj8m.png"))
                }
            } else if(m.content === "mage" || "Mage") {
                if(profileData.level < 5) {
                    return message.channel.send('You are not high enough level!')
                }
                if(profileData.class.includes('Warrior')){
                    revert = {
                        $divide: [
                            "$damage", 1.6
                        ]
                    }
                    multi = {
                        $multiply: [
                            "$mDamage", 2,
                        ]
                    }
                    health = {
                        $multiply: [
                            "$healthP", 0.2
                        ]
                    }
                    changes = [{
                        $set: {
                            damage: revert,
                            mDamage: multi,
                            healthP: health,
                            class: "Mage"
                        }
                    }]
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id
                    }, changes)
                } else {
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id
                    },
                    {
                        $mul: {
                            mDamage: 2,
                            healthP: 1.4
                        },
                        $set: {
                            class: "Mage"
                        }
                    },
                    {
                        upsert: true
                    })
                }
                classMsg.edit(Embed.setAuthor(`${message.author.username}`, message.author.displayAvatarURL()).setColor("GREEN").setTitle(`${message.author.username} is now a mage!`).setDescription('').setThumbnail("https://imgur.com/NRfCpWl.png"))
            }
        })

    }
}