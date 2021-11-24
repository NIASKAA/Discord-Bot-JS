const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "status",
    description: "Check user profile",
    async execute(message, args, cmd, client, Discord, profileData) {
        const Embed = new MessageEmbed()
        .setColor("RED")
        .setAuthor(`Profile: ${message.author.username}`, message.author.displayAvatarURL())
        .addFields(
            {name: 'Health', value: `${profileData.healthP}` ? `${profileData.healthP}` : 'Unknown', inline: true},
            {name: 'Mana', value: `${profileData.manaP}` ? `${profileData.manaP}` : 'Unknown', inline: true},
            {name: 'Level', value: `${profileData.level}` ? `${profileData.level}` : 'Unknown', inline: true},
            {name: 'Pocket Money', value: `${profileData.coins}` ? `${profileData.coins}` : 'Unknown', inline: true},
            {name:  'Bank', value: `${profileData.bank}` ? `${profileData.bank}` : 'Unknown', inline: true},
            {name: 'Location', value: `${profileData.location}` ? `${profileData.location}` : 'Unknown', inline: true},
            {name: 'Physical Damage', value: `${profileData.damage}` ? `${profileData.damage}` : 'Unknown', inline: true},
            {name: 'Magic Damage', value: `${profileData.mDamage}` ? `${profileData.mDamage}` : 'Unknown', inline: true},
            {name: 'Class', value: `${profileData.class}` ? `${profileData.class}` : 'Unknown', inline: true},
            {name: 'Inventory', value: `${profileData.inventory}` ? `${profileData.inventory}` : 'Unknown'},
            {name: 'Weapon', value: `${profileData.weapon}` ? `${profileData.weapon}` : 'Unknown', inline: true},
            {name: 'Spells', value: `${profileData.spells}` ? `${profileData.spells}` : 'Unknown', inline: true},
            {name: 'Helmet', value: `${profileData.equip[0].helmet}` ? `${profileData.equip[0].helmet}` : 'Unknown', inline: true},
            {name: 'Armor', value: `${profileData.equip[0].armor}` ? `${profileData.equip[0].armor}` : 'Unknown', inline: true},
            {name: 'Leg', value: `${profileData.equip[0].leg}` ? `${profileData.equip[0].leg}` : 'Unknown', inline: true},
            {name: 'Accessories', value: `${profileData.equip[0].aces}` ? `${profileData.equip[0].aces}` : 'Unknown', inline: true},
        )

        let msg = await message.channel.send(Embed)
        msg.catch(error => {
            console.log(error)
        });
    }
}