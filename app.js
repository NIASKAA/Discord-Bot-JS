const Discord = require('discord.js');
const bot = new Discord.Client();
require('dotenv').config();

const TOKEN  = process.env.TOKEN;

bot.login(TOKEN);