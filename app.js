const Discord = require('discord.js');
const fs = require('fs');
require('dotenv').config();
const Client = require('./client/Client');
const TOKEN  = process.env.TOKEN;
client.login(TOKEN);
const {prefix} = require('./config.json');
const client = new Client();
client.commands = new Discord.Collection();
const command = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for(const file of command) {
    const commandInput = require(`./commands/${file}`);
    client.commands.set(commandInput.name, commandInput);
}

client.on('message', async message => {
    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName);

    if(message.author.bot) 
    return;
    if(!message.content.startsWith(prefix))
    return;

    try {
        if(commandName == "ban" || commandName == "userinfo") {
            command.execute(message, client);
        } else {
            command.execute(message);
        }
    } catch (error) {
        console.error(error);
        message.reply("That didn't really work...")
    }
});

client.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
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




