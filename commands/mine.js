const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'mine',
    cooldown: 600,
    description: 'Go mine for some ores',
    async execute(message, args, cmd, client, Discord, profileData) {
        ores = ['iron', 'cooper', 'gold', 'ruby', 'sapphire', 'amethyst', 'diamond', 'emerald']
        const randomOres = Math.floor((Math.random() * ores.length));
      
        params = {
            userID: message.author.id,
            serverID:  message.guild.id
        }
        
        profileModel.findOne(params, async(err, data) => {
        if(data) {
            const getOres = Object.keys(data.inventory).includes(randomOres);
            if(!getOres) {
                data.inventory[randomOres] = 1;
            } else {
                data.inventory[randomOres]++;
            }
            await profileModel.findOneAndUpdate({
                userID: message.author.id,
            },
            {
                $push: {
                    inventory: ores[randomOres]
                }
            }, data);
            }
            message.reply(`You mined and found a ${ores[randomOres]}`);
        })
    }
};