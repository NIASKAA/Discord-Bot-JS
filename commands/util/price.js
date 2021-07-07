const axios = require('axios');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'price',
    description: 'Get crypto price',
    async execute(message, args, cmd, client, Discord) {
        const [command, ...arg] = message.content.split(' ');

        if(args.length !== 2) {
            return message.reply('You need to provide the crypto and currency to compare brah');
        } else {
            const [coin, currency] = arg;
            try {
                const { data } = await axios.get(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=${currency}`
                );

                if(!data[coin][currency]) throw err;
                const Embed = new MessageEmbed()
                .setColor("RED")
                .setTitle("Crypto Rates")
                .setDescription(`
                1 ${coin} \n
                = ${data[coin][currency]} ${currency}
                `)
                return message.reply(Embed);
            } catch (err) {
                return message.reply('Input should be for example: !price bitcoin usd');
            }
        }
    }
}