const axios = require('axios');
const { MessageEmbed } = require('discord.js');

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

            const Embed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle("Crypto News!")
            .setDescription(`
            Title: ${title} \n
            Description: ${description} \n 
            Source: ${name} \n
            Link: ${url} \n
            `)
            return message.reply(Embed);
        } catch (err) {
            return message.reply('Error, try again later');
        }
    }
}