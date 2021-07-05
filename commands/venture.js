const profileModel = require('../models/profileSchema');
const locations = require('../models/locations');

module.exports = {
    name: 'venture',
    description: 'Adventure time',
    async execute(message, args, cmd, client, Discord, profileData) {
        const randomLocation = locations[Math.floor(Math.random() * locations.length)]
        const Embed = new MessageEmbed()
        .setColor("YELLOW")
        .setDescription(`Will you venture into ${randomLocation.name}?`)
        let msg = await message.channel.send(Embed)

        await msg.react('✅');
        await msg.react('❌');

        const yesReact = (reaction, user) => reaction.emoji.name === "✅'" && user.id === message.author.id;
        const noReact = (reaction, user) => reaction.emoji.name === "❌" && user.id === message.author.id;
        
        const yes = msg.createReactionCollector(yesReact, {time: 900000, dispose: true});
        const no = msg.createReactionCollector(noReact, {time: 900000, dispose: true});

        yes.on("collect", erase => {
            erase.users.remove(message.author.id);
            
            Embed
            .setDescription(`Moved to ${randomLocation.name} with ${randomLocation.enemies} enemies`)
            await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id,
                },
                {
                    $set: {
                        location: randomLocation.name
                    },
                });
            msg.edit(Embed)
        })

        no.on("collect", erase => {
            erase.users.remove(message.author.id);
            let goHome = "home"
            Embed
            .setDescription("Going back home")
            await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id,
                },
                {
                    $set: {
                        location: goHome
                    },
                });
            msg.edit(Embed)
        })
    }
}