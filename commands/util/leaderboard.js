const profileModel = require('../../models/profileSchema');
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'leaderboard',
    aliases: 'lb',
    description: 'Check who is on top',
    async execute(message, args, cmd, client, Discord, profileData) {
        profileModel.find({serverID: message.guild.id})
        .sort([['bank', 'descending']])
        .exec((err, res) => {
          if (err) console.log(err);
        
          let Embed = new MessageEmbed()
            .setTitle("Coins Leaderboard")
          if (res.length === 0) {
            Embed.setColor("RED");
            Embed.addField("No data found", "Go make some money man")
          } else if (res.length < 10) {
            Embed.setColor("BLUE");
            for (i = 0; i < res.length; i++) {
              let member = client.users.cache.get(res[i].userID).tag || "User Left"
              if (member === "User Left") {
                Embed.addField(`${i + 1}. ${member}`, `**Bank**: ${res[i].bank}`);
              } else {
                Embed.addField(`${i + 1}. ${member}`, `**Bank**: ${res[i].bank}`);
              }
            }
          } else {
            Embed.setColor("BLUE");
            for (i = 0; i < 10; i++) {
              let member = client.users.cache.get(res[i].userID).tag || "User Left"
              if (member === "User Left") {
                Embed.addField(`${i + 1}. ${member}`, `**Bank**: ${res[i].bank}`);
              } else {
                Embed.addField(`${i + 1}. ${member}`, `**Bank**: ${res[i].bank}`);
              }
            }
          }
        
          message.channel.send(Embed);
        })
    }
}


