const profileModel = require('../../models/profileSchema');
const mines = require('../../models/ores');
const {MessageEmbed} = require('discord.js')

module.exports = {
    name: 'mine',
    cooldown: 600,
    description: 'Go mine for some ores',
    async execute(message, args, cmd, client, Discord, profileData) {
        if(profileData.inventory.find((x) => x.toLowerCase() === "pickaxe") === undefined ) {
            return message.channel.send('What are you doing bruv? Mining with your hands? Go buy a pickaxe mate')
        }
        
        const ores = mines[Math.floor(Math.random() * mines.length)].name
        const images = mines.find((val) => val.name === ores).image
        params = {
            userID: message.author.id,
        }

        Embed = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .setTitle(`You mined and found ${ores}`)
        .setThumbnail(`${images}`)
    
        profileModel.findOne(params, async(err, data) => {
        if(data) {
            await profileModel.findOneAndUpdate({
                userID: message.author.id,
            },
            {
                $push: {
                    inventory: ores
                }
            }, data);
            }
            message.channel.send(Embed);
        })
    }
};