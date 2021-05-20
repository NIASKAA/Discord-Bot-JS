const Discord = require('discord.js');
const bot = new Discord.Client();
require('dotenv').config();

const TOKEN  = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    if(msg.content === 'ping') {
        msg.reply('pong');
        msg.channel.send('pong')
    }
});

bot.on('message', msg => {
    if(msg.content === 'Hi') {
        msg.reply('Harro')
    }
});

bot.on('message', msg => {
    if(msg.content === 'Hello') {
        msg.reply('Harro')
    }
});

const badjokes = 
[
    "Why did the chicken cross the road? Because it was disable",
    "I want to fucking kill myself.. That's funny right?",
    "IT'S THAT A SUPRA? ",
    "Is that a transformer? ",
    "WHAT DO YOU MEANNNN THO?",
    "Stop. Get some help."
];

bot.on('message', (msg) => {
    if(msg.content === '?joke') {
        msg.channel.send(badjokes[Math.floor(Math.random() * badjokes.length)]);
    }
});