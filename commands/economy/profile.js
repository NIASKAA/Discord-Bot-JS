const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "stats",
    description: "Check user profile",
    async execute(message, args, cmd, client, Discord, profileData) {
        let list1 =(
            {name: 'Level', value: `${profileData.level}` ? `${profileData.level}` : 'Unknown'},
            {name: 'Pocket Money', value: `${profileData.coins}` ? `${profileData.coins}` : 'Unknown'},
            {name:  'Bank', value: `${profileData.bank}` ? `${profileData.bank}` : 'Unknown'},
            {name: 'Inventory', value: `${profileData.inventory}` ? `${profileData.inventory}` : 'Unknown'},
            {name: 'Location', value: `${profileData.location}` ? `${profileData.location}` : 'Unknown'},
            {name: 'Class', value: `${profileData.class}` ? `${profileData.class}` : 'Unknown'}
        )

        let list2 =(
            {name: 'Health', value: `${profileData.healthP}` ? `${profileData.healthP}` : 'Unknown'},
            {name: 'Mana', value: `${profileData.manaP}` ? `${profileData.manaP}` : 'Unknown'},
            {name: 'Physical Damage', value: `${profileData.damage}` ? `${profileData.damage}` : 'Unknown'},
            {name: 'Magic Damage', value: `${profileData.mDamage}` ? `${profileData.mDamage}` : 'Unknown'}
        )

        let pages = [list1, list2]
        let page = 1
        
        const Embed = new MessageEmbed()
        .setColor("RED")
        .setAuthor(`Profile: ${message.author.username}`, message.author.displayAvatarURL())
        .setDescription(pages[page - 1])
        .addFields(
            {name: 'Weapon', value: `${profileData.weapon}` ? `${profileData.weapon}` : 'Unknown'},
            {name: 'Helmet', value: `${profileData.equip[0].helmet}` ? `${profileData.equip[0].helmet}` : 'Unknown', inline: true},
            {name: 'Armor', value: `${profileData.equip[0].armor}` ? `${profileData.equip[0].armor}` : 'Unknown', inline: true},
            {name: 'Leg', value: `${profileData.equip[0].leg}` ? `${profileData.equip[0].leg}` : 'Unknown', inline: true},
            {name: 'Accessories', value: `${profileData.equip[0].aces}` ? `${profileData.equip[0].aces}` : 'Unknown', inline: true},
            {name: 'Spells', value: `${profileData.spells}` ? `${profileData.spells}` : 'Unknown'}
        )
        .setFooter(`Page: ${page} / ${pages.length}`)
        let msg = await message.channel.send(Embed)
        msg.catch(error => {
            console.log(error)
        });

        await msg.react("⬅️");
        await msg.react("➡️");

        if(pages.length === 1) return;


        const rightFilter = (reaction, user) => reaction.emoji.name === "➡️" && user.id === message.author.id;
        const leftFilter = (reaction, user) => reaction.emoji.name === "⬅️" && user.id === message.author.id;
        
        const right = msg.createReactionCollector(rightFilter, { dispose: true});
        const left = msg.createReactionCollector(leftFilter, {dispose: true});

        left.on("collect", erase => {
            erase.users.remove(message.author.id);
            if(page === 1) return;
            page--;
            Embed
            .setDescription(pages[page-1])
            .setFooter(`Page: ${page} / ${pages.length}`);
            msg.edit(Embed)
        })

        right.on("collect", erase => {
            erase.users.remove(message.author.id);
            if(page === pages.length) return;
            page++;
            Embed.setDescription(pages[page-1]).setFooter(`Page: ${page} / ${pages.length}`);
            msg.edit(Embed)
        })
    }
}