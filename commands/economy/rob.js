const profileModel = require('../../models/profileSchema');
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'rob',
    cooldown: 1800,
    description: 'Being a thief',
    async execute(message, args, cmd, client, Discord, profileData) {
        let user = message.mentions.users.first()
        let targetUser = user.id.coins
        let random = Math.floor(Math.random() * 200) + 1;

        Embed = new MessageEmbed()
        .setColor("RED")
        .setTitle("ROBBED")
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .setDescription(`You robbed ${user} and took ${random}`)
        .setThumbnail(user.displayAvatarURL())
        
        if(!user) {
            return message.channel.send('You need to tell me who to rob at least bruh');
        }
        if(targetUser < 0) {
            return message.channel.send(`${user} is broke af and don't have anything left to rob`)
        }
        try{
            await profileModel.findOneAndUpdate({
                userID: user.id,
            },
            {
                $inc: {
                    coins: -random,
                }
            });
            await profileModel.findOneAndUpdate({
                userID: message.author.id
            },
            {
                $inc: {
                    coins: random
                }
            });
        } catch(err) {
            console.log(err);
        }
        message.channel.send(Embed);
    }
}