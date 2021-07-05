const { MessageEmbed } = require("discord.js");
const profileModel = require('../models/profileSchema');

module.exports = {
    name: "search",
    cooldown: 900,
    description: 'Search an area for some coins',
    execute(message, args, cmd, client, Discord, profileData) {
      const locations = [
        "car",
        "sock",
        "milk",
        "wallet",
        "box",
        "pocket",
        "bus",
        "gutters",
        "park",
        "train",
        "lounge",
        "keyboard",
        "picnic",
        "bathroom",
        "bed",
        "sofa",
        "backpack",
        "laptop",
        "oculus",
        "shirt",
      ];
  
      let chosenLocations = locations.sort(() => Math.random() - Math.random()).slice(0, 3);
  
      const randomNumber = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
  
      const filter = (m) => {
        return chosenLocations.some((answer) => answer.toLowerCase() === m.content.toLowerCase()) && m.author.id === message.author.id;
      };
  
      const collector = message.channel.createMessageCollector(filter, { max: 1, time: 15000 });
  
      collector.on("collect", async (m) => {
        const Embed = new Discord.MessageEmbed()
          .setColor("#ffa500")
          .setTitle(`${message.author.username} searched a ${m.content} 🕵️`)
          .setDescription(`You found ${randomNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`)
          .setFooter(`A true detective you are.`);
  
        await profileModel.findOneAndUpdate(
          {
            userID: message.author.id,
          },
          {
            $inc: {
              coins: randomNumber,
            },
          }
        );
  
        message.channel.send(Embed);
      });
  
      collector.on("end", (collected) => {
        if (collected.size == 0) {
          return message.channel.send(
            `What are you doing <@${message.author.id}>?! There was ₿${randomNumber.toString().replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            )} hidden inside the ${chosenLocations[0]} 😭`
          );
        }
      });
  
      message.channel.send(
        `<@${
          message.author.id
        }>\n**Which location would you like to search?** 🔍\nType the location in this channel.\n\`${chosenLocations.join("` `")}\``
      );
    },
  };