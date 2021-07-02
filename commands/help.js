const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'help',
    description: 'List of commands available',
    async execute(message, args, cmd, client, Discord, profileData) {
        const Embed = new MessageEmbed()
        .setTitle("Commands")
        .setColor("RED")
        .setDescription(`
        !ping \n
        !play \n
        !stop \n
        !skip \n
        !leave \n
        !price \n
        !news \n
        !help \n
        !jokes \n
        !roast \n
        !wey \n
        !poll \n
        \n
        Economy commands: \n
        !balance \n
        !daily \n
        !beg \n
        !withdraw \n
        !deposit \n
        !work \n
        !shop \n 
        !buy \n
        !fish \n
        !rob \n
        !hunt \n
        !search \n`);
        
        message.author.send(Embed);
    }
};