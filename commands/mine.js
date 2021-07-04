const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'mine',
    cooldown: 600,
    description: 'Go mine for some ores',
    async execute(message, args, cmd, client, Discord, profileData) {
        if(profileData.inventory.find((x) => x.toLowerCase() === "pickaxe") === undefined ) {
            return message.channel.send('What are you doing bruv? Mining with your hands? Go buy a pickaxe mate')
        }
        ores = ['iron', 'copper', 'gold', 'ruby', 'sapphire', 'amethyst', 'diamond', 'emerald']
        const randomOres = Math.floor((Math.random() * ores.length));
      
        await profileModel.findOneAndUpdate({
            userID: message.author.id,
        },
        {
            $push: {
                inventory: ores[randomOres]
            }
        }, data);
    
        message.reply(`You mined and found a ${ores[randomOres]}`);
    }
};