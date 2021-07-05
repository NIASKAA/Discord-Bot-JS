const profileModel = require('../models/profileSchema')
const weapons = require('../models/weapon')
const locations = require('../models/locations')
const enemy = require('../models/enemy')
const {MessagedEmbed} = require('discord.js');

module.exports.run = async(message, args, cmd, client, Discord, profileData) => {
    let player = message.author.id
    
    const randomEnemy = enemy[Math.floor(Math.random() * enemy.length)];
    const question = `You find yourself in front of a ${randomEnemy.name}. Will you confront it?`
    const Embed1 = new MessagedEmbed()
    .setColor("BLUE")
    .setDescription(question)
    let msg = await message.channel.send(Embed1)

    await msg.react('⚔️');
    await msg.react('👟');

    const attackReact = (reaction, user) = reaction.emoji.name === '⚔️' && user.id === message.author.id;
    const runReact = (reaction, user) = reaction.emoji.name === '👟' && user.id === message.author.id;

    const attack = msg.createReactionCollector(attackReact, {time: 900000, dispose: true})
    const run = msg.createReactionCollector(runReact, {time: 900000, dipose: true})
    
    attack.on("collect", erase => {
        erase.users.remove(message.author.id);
        attack.stop()
        run.stop()
    
        Embed1
        .setTitle('BATTLE')
        .setDescription()
        msg.edit(Embed1)
    })
    
    run.on("collect", erase => {
        erase.users.remove(message.author.id);
        Embed1
        .setDescription('You decided not to attack that monster')
        msg.edit(Embed1)
    })
}   