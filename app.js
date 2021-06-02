const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();
const TOKEN = process.env.TOKEN;

client.login(TOKEN);
const prefix = '!';

client.on('ready', () => {
    console.info(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if(msg.content === 'ping') {
        msg.channel.send('pong')
    }
});

client.on('message', msg => {
    if(msg.content === 'Hi') {
        msg.reply('Harro')
    }
});

client.on('message', msg => {
    if(msg.content === 'Hello') {
        msg.reply('Harro')
    }
});

client.on('message', msg => {
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

client.on('message', (msg) => {
    if(msg.content === '?joke') {
        msg.channel.send(badjokes[Math.floor(Math.random() * badjokes.length)]);
    }
});

client.on('guildMemberAdd', guildMember => {
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'member');
    guildMember.roles.add(welcomeRole);
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if(command === 'play') {
        client.commands.get('play').execute(message, args);
    } else if(command === 'leave') {
        client.commands.get('leave').execute(message, args)
    }
});