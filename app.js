const Discord = require('discord.js');
const fs = require('fs');
const mongoose = require('mongoose');
const profile = require('./models/profileSchema');
const client = new Discord.Client();
require('dotenv').config();
const TOKEN = process.env.TOKEN;
client.login(TOKEN);
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['commandHandler', 'eventHandlers'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
}) 

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
.then(() => {
    console.log("Connected to mongoDB database!");
})
.catch((err) => {
    console.log(err);
});

client.on('guildMemberAdd', guildMember => {
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'member');
    guildMember.roles.add(welcomeRole);
});
