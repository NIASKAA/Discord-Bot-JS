const axios = require('axios');

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
                return message.reply(`The current price of 1 ${coin} = ${data[coin][currency]} ${currency}`);
            } catch (err) {
                return message.reply('Input should be for example: !price bitcoin usd');
            }
        }
    }
}