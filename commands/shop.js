const items = require('../models/shopItems');

module.exports = {
    name: 'shop',
    description: 'Your local shop',
    async execute(message, args, cmd, client, Discord, profileData) {
        if(items.length === 0) return message.reply('There are no items for sale!');

        const shopList = items.map((value, index) => {
            return `${index + 1} ${value.item} -> ${value.price} coins!`
        });

        message.channel.send(shopList);
    },
}