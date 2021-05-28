const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client();
require('dotenv').config();

const TOKEN  = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    if(msg.content === 'ping') {
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

bot.on('message', msg => {
    if(msg.content === 'Marco') {
        msg.channel.send('Pollo bitch')
    }
});

const badjokes = 
[
    "Why did the chicken cross the road? Because it was disabled",
    "I want to fucking kill myself.. That's funny right?",
    "IS THAT A SUPRA?",
    "Is that a transformer?",
    "WHAT DO YOU MEANNNN THO?",
    "Stop. Get some help.",
    "Error. System reboot. Sike, fuck you.",
    "What do you call an alligator that wants to be a detective? An investigator. ACK ACK ACK",
    "HAMBURGER PLS",
];

bot.on('message', (msg) => {
    if(msg.content === '?joke') {
        msg.channel.send(badjokes[Math.floor(Math.random() * badjokes.length)]);
    }
});




