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
        const filter = (user) => user.id = message.author.id
        const collector = message.channel.createMessageCollector(filter, {max: 1})

        collector.on('collect', async(m) => {
            if(m.content === "warrior" || "Warrior") {
                if(profileData.level < 5) {
                    return message.channel.send('You are not high enough level!')
                }
                if(profileData.class.includes('Mage')) {
                    return message.send("You already have a class! Wait till level 12 to change!")
                }
                if(profileData.class.includes('Thief')){
                    return message.send("You already have a class! Wait till level 12 to change!")
                } 
                await profileModel.findOneAndUpdate({
                    userID: message.author.id
                },
                {
                    $mul: {
                        damage: 1.6,
                    },
                    $set: {
                        class: "Warrior"
                    }
                },
                {
                    upsert: true
                })
                classMsg.edit(Embed.setAuthor(`${message.author.username}`, message.author.displayAvatarURL()).setColor("GREEN").setTitle(`${message.author.username} is now a warrior!`).setDescription('').setThumbnail("https://imgur.com/ynUJVus.png"))
                
            }
            if(m.content === "mage" || "Mage") {
                if(profileData.level < 5) {
                    return message.channel.send('You are not high enough level!')
                }
                if(profileData.class.includes('Thief')){
                    return message.send("You already have a class! Wait till level 12 to change!")
                } else if(profileData.class.includes('Warrior')){
                    return message.send("You already have a class! Wait till level 12 to change!")
                }{
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id
                    },
                    {
                        $mul: {
                            mDamage: 2,
                        },
                        $set: {
                            class: "Mage"
                        }
                    },
                    {
                        upsert: true
                    })
                    classMsg.edit(Embed.setAuthor(`${message.author.username}`, message.author.displayAvatarURL()).setColor("GREEN").setTitle(`${message.author.username} is now a mage!`).setDescription('').setThumbnail("https://imgur.com/tE447hA.png"))
                }
            } 
            if(m.content === "thief" || "Thief") {
                if(profileData.level < 5) {
                    return message.channel.send('You are not high enough level!')
                }
                if(profileData.class.includes('Warrior')){
                    return message.send("You already have a class! Wait till level 12 to change!")
                }
                if(profileData.class.includes('Mage')){
                    return message.send("You already have a class! Wait till level 12 to change!")
                }
                await profileModel.findOneAndUpdate({
                    userID: message.author.id
                },
                {
                    $mul: {
                        damage: 1.5,
                    },
                    $set: {
                        class: "Thief",
                        crit: 2
                    }
                },
                {
                    upsert: true
                })
                classMsg.edit(Embed.setAuthor(`${message.author.username}`, message.author.displayAvatarURL()).setColor("GREEN").setTitle(`${message.author.username} is now a thief!`).setDescription('').setThumbnail("https://imgur.com/npjQW0h.png"))
            }
        })

    }
}