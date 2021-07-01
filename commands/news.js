const axios = require('axios');

module.exports = {
    name: 'news',
    description: 'Get crypto price',
    async execute(message, args, cmd, client, Discord) {
        try {
            const { data } = await axios.get(`https://newsapi.org/v2/everything?q=crypto&apiKey=${process.env.NEWSKEY}&pageSize=1&sortBy=publishedAt`);
            
            const { 
                title, 
                source: {name}, 
                description, 
                url
            } = data.articles[0];

            return message.reply(`
            Latest news to crypto: \n
            Title: ${title}\n
            Description: ${description}\n
            Source: ${name}\n
            Link to article: ${url}
            `);
        } catch (err) {
            return message.reply('Error, try again later');
        }
    }
}