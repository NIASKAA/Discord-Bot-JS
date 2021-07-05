const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "balance",
    description: "Check user balance",
    async execute(message, args, cmd, client, Discord, profileData) {
            const Embed = new MessageEmbed()
            .setColor("YELLOW")
            .setTitle("Balance Info")
            .setDescription(`
                On you: ${profileData.coins} \n
                Bank: ${profileData.bank} \n
                Inventory: ${profileData.inventory} \n
                Level: ${profileData.level} \n
                Health: ${profileData.healthP} \n
                Mana: ${profileData.manaP} \n
                Location: ${profileData.location} \n
            `)
            message.channel.send(Embed);
    }
}