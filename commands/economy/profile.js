const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "profile",
    description: "Check user profile",
    async execute(message, args, cmd, client, Discord, profileData) {
        let list1 =(`
        Basic Info: \n
        Level: ${profileData.level} \n
        On you: ${profileData.coins} \n
        Bank: ${profileData.bank} \n
        Inventory: ${profileData.inventory} \n
        Location: ${profileData.location} \n
        Class: ${profileData.class} \n
        `)

        let list2 =(`
        Stats: \n
        Health: ${profileData.healthP} \n
        Mana: ${profileData.manaP} \n
        Physical Damage: ${profileData.damage} \n
        Magic Damage: ${profileData.mDamage} \n
        Spells: ${profileData.spells} \n
        `)

        let pages = [list1, list2]
        let page = 1
        
        const Embed = new MessageEmbed()
        .setColor("RED")
        .setAuthor(`Profile: ${message.author.username}`, message.author.displayAvatarURL())
        .setDescription(pages[page - 1])
        .addFields(
            {name: 'Weapon', value: `${profileData.weapon}`},
            {name: 'Helmet', value: `${profileData.equip[0].helmet}`},
            {name: 'Armor', value: `${profileData.equip[0].armor}`},
            {name: 'Leg', value: `${profileData.equip[0].leg}`},
            {name: 'Accessories', value: `${profileData.equip[0].aces}`}
        )
        .setFooter(`Page: ${page} / ${pages.length}`)
        let msg = await message.channel.send(Embed)
        await msg.react("⬅️");
        await msg.react("➡️");

        if(pages.length === 1) return;


        const rightFilter = (reaction, user) => reaction.emoji.name === "➡️" && user.id === message.author.id;
        const leftFilter = (reaction, user) => reaction.emoji.name === "⬅️" && user.id === message.author.id;
        
        const right = msg.createReactionCollector(rightFilter, {time: 900000, dispose: true});
        const left = msg.createReactionCollector(leftFilter, {time: 900000, dispose: true});

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