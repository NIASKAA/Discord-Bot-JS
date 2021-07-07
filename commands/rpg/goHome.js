const profileModel = require('../../models/profileSchema');
const locations = require('../../models/locations');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'goHome',
    description: 'Go back home',
    async execute(message, args, cmd, client, Discord, profileData) {
        const goHome = 'home'
        Embed = new MessageEmbed()
        .setTitle('Status...')
        .setDescription("Going back home")
        .setImage('https://imgur.com/si7QsRB.png')
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
    }
}