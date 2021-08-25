const profileModel = require('../../models/profileSchema');
const { MessageEmbed } = require('discord.js');
const {items} = require('../../models/encounterShop');

module.exports.run = async (message, args, cmd, client, Discord, profileData) =>{
    const Embed = new MessageEmbed()
    .setColor("GREEN")
    .setDescription(`Will you like to buy from my shop? `)
    let msg = await message.channel.send(Embed)

    await msg.react('✅');
    await msg.react('❌');

    const yesReact = (reaction, user) => reaction.emoji.name === "✅" && user.id === message.author.id;
    const noReact = (reaction, user) => reaction.emoji.name === "❌" && user.id === message.author.id;
        
    const yes = msg.createReactionCollector(yesReact, {dispose: true});
    const no = msg.createReactionCollector(noReact, {dispose: true});

    no.on("collect", erase => {
        erase.users.remove(message.author.id);
        msg.edit(Embed.setTitle('Status...').setColor("YELLOW").setDescription("Going back to town").setImage('https://imgur.com/KOYoNfA.png'))
        params = {
            userID: message.author.id,
        }
        profileModel.findOne(params, async(err, data) => {
            await profileModel.updateMany({
                userID: message.author.id,
            },
            {
                $set: {
                    location: goTown
                },
            },
            {
                upsert: true
            });
        })
        
    })

    yes.on("collect", erase => {
        erase.users.remove(message.author.id);
        let itemName = items.find(val => val.name).name
        let itemPrice= items.find(val => val.name).price
        let itemImage= items.find(val => val.name).image
        msg.edit(Embed.setTitle('What would you like to buy?').setColor('GREEN').setDescription('').setFooter('Reply back with item name'))
        const filter = (user) => user.id = message.author.id
        const collector = message.channel.createMessageCollector(filter, {max: 1})

        collector.on("collect", async(m) => {
            if(m.content === itemName) {
                const params = {
                    userID: message.author.id,
                }
                profileModel.findOne(params, async(err, data) => {
                    await profileModel.updateMany({
                        userID: message.author.id,
                    },
                    {
                        $inc: {
                            coins: -itemPrice,
                        },
                        $push: {
                            inventory: m.content
                        }
                    },
                    {
                        upsert: true
                    });
                    msg.edit(Embed.setColor("GREEN").setAuthor(`${message.author.username}`, message.author.displayAvatarURL()).setTitle(`${message.author.username} bought ${m.content}`).setImage(itemImage))
                })
            }
        })
    })
}