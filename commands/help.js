module.exports = {
    name: 'help',
    description: 'List of commands available',
    async execute(message, args, cmd, client, Discord) {
        const Embed = new RichEmbed()
        .setTitle("Commands")
        .setColor("RED")
        .setDescription(`
        !ping \n
        !play \n
        !stop \n
        !skip \n
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
        !inventory \n
        !fish \n
        !rob \n
        !hunt \n`);
        
        message.author.send(Embed);
    }
};