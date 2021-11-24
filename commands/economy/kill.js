const profileModel = require('../../models/profileSchema');
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'kill',
    cooldown: 20000,
    description: 'Chance to kill someone',
    async execute(message, args, cmd, client, Discord, profileData) {
        const randomNumber = Math.floor(Math.random() * 1) + 1;
        let user = message.mentions.users.first()
        let author = message.author.id

        if(!user) return message.channel.send('You need to pick someone first bruh')
        if(author.healthP <= 0) return message.channel.send("You don't even have health yourself")

        Embed = new MessageEmbed()
        .setColor("RED")
        .setTitle("KILL")
        .author(`${message.author.username}`, message.author.displayAvatarURL())
        

        message.channel.send(Embed)
    }
}