const profileModel = require('../../models/profileSchema');
const locations = require('../../models/locations');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'gohome',
    description: 'Go back home',
    async execute(message, args, cmd, client, Discord, profileData) {
        params = {
            userID: message.author.id,
        }
        let conditions = ["house", "apartment", "small cabin", "shed"]
        let checkHome = conditions.some(el => profileData.inventory.includes(el));
        if(!checkHome) {
            return message.reply(`${message.author.username} don't have a property!`)
        }

        Embed = new MessageEmbed()
        .setColor("YELLOW")
        .setTitle('Status...')
        .setDescription("Going back home")
        .setImage('https://imgur.com/si7QsRB.png')

        if(profileData.inventory.includes("shed")) {
            profileModel.findOne(params, async(err, data) => {
                await profileModel.updateMany({
                    userID: message.author.id,
                },
                {
                    $set: {
                        location: "home",
                    },
                    inc: {
                        healthP: 15,
                        manaP: 15
                    }
                },
                {
                    upsert: true
                });
            })
            message.channel.send(Embed)
        } else if (profileData.inventory.includes("small cabin")) {
            profileModel.findOne(params, async(err, data) => {
                await profileModel.updateMany({
                    userID: message.author.id,
                },
                {
                    $set: {
                        location: "home",
                    },
                    inc: {
                        healthP: 20,
                        manaP: 20
                    }
                },
                {
                    upsert: true
                });
            })
            message.channel.send(Embed)
        } else if (profileData.inventory.includes("apartment")) {
            profileModel.findOne(params, async(err, data) => {
                await profileModel.updateMany({
                    userID: message.author.id,
                },
                {
                    $set: {
                        location: "home",
                    },
                    inc: {
                        healthP: 50,
                        manaP: 50
                    }
                },
                {
                    upsert: true
                });
            })
            message.channel.send(Embed)
        } else if (profileData.inventory.includes("house")) {
            profileModel.findOne(params, async(err, data) => {
                await profileModel.updateMany({
                    userID: message.author.id,
                },
                {
                    $set: {
                        location: "home",
                        healthP: 100,
                        manaP: 100
                    },
                },
                {
                    upsert: true
                });
            })
            message.channel.send(Embed)
        }
       
       
    }
}