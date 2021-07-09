const { MessageEmbed } = require('discord.js');
const food = require('../../models/consumable');
const items = require('../../models/shopItems');
const weapon = require('../../models/weapon');

module.exports = {
    name: 'shop',
    description: 'Your local shop',
    async execute(message, args, cmd, client, Discord, profileData) {
        if(items.length === 0) return message.reply('There are no items for sale!');

        const shopList = items.map((value, index) => {
            return `${index + 1} ${value.item} -> ${value.price} coins!`
        });

        const foodList = food.map((value, index) => {
            return `${index + 1} ${value.items} -> ${value.price} coins`
        });

        const weaponList = weapon.map((value, index) => {
            return `${index + 1} ${value.name} -> ${value.price} coins`
        });

        let pages = [shopList, foodList, weaponList]
        let page = 1
        const Embed = new MessageEmbed()
        .setColor("GREEN")
        .setTitle("Items/Food/Weapon")
        .setDescription(pages[page - 1])
        .setFooter(`Page: ${page} / ${pages.length}`)

        let msg = await message.channel.send(Embed)
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
    },
}