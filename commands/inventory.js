const profileModel = require('../models/profileSchema');
const items = require('../models/shopItems');

module.exports = {
    name: 'inventory',
    description: 'Check your inventory',
    async execute(message, args, cmd, client, Discord, profileData) {
        profileModel.findOne({
            userID: message.author.id,
            serverID: message.guild.id
        },
        async(err, data) => {
            if(!data) return message.channel.send('Your inventory is empty')
            const mappedData = Object.keys(data.inventory).map((key) => {
                return `${key}(${data.inventory[key]})`
            }).join(", ");

            message.channel.send(mappedData);
        }
        );
    },
};