const profileModel = require("../../models/profileSchema");
const cooldowns = new Map();

module.exports = async (Discord, client, message) => {
    const prefix = '!';
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    let profileData;
    try{
        profileData = await profileModel.findOne({
            userID: message.author.id
        })
        if(!profileData) {
            let profile = await profileModel.create({
                userID: message.author.id,
                serverID: message.guild.id,
                coins: 1000,
                bank: 0,
                inventory: []
            });
            profile.save();
        }

    } catch(err) {
        console.log(err);
    }
    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    if(!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const currentTime = Date.now();
    const timeStamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown) * 1000;

    if(timeStamps.has(message.author.id)) {
        const expireTime = timeStamps.get(message.author.id) + cooldownAmount;
        if(currentTime < expireTime) {
            const timeLeft = (expireTime - currentTime) /1000;
            return message.reply(`Please wait ${timeLeft.toFixed(1)} more seconds before using command`);
        }
    }

    timeStamps.set(message.author.id, currentTime);
    setTimeout(() => timeStamps.delete(message.author.id), cooldownAmount);

    if(command) command.execute(message, args, cmd, client, Discord, profileData);

}