const profileModel = require('../../models/profileSchema')
const { MessageEmbed } = require('discord.js');
const Enemy = require('../../classes/enemy');
const utils = require('../../events/utils');
const Embed2 = require('../rpg/battleAI');

module.exports ={
    attackAI
}

async function attackAI (message, args, cmd, client, Discord, profileData) {
    let weaponDamage = profileData.damage
    let magicDamage = profileData.mDamage
    let enemy = new Enemy();
    let userLuck = Math.floor(Math.random() *3)
    let enemyLuck = Math.floor(Math.random() *2)
    let userCrit = Math.random()
    let critChance= Math.random()
    let currentHealth = await profileModel.findOne({userID: message.author.id})
    if(userLuck >= enemyLuck) {
        if(userCrit <= critChance){
        successAttack = `You attacked ${enemy.name} for ${weaponDamage }!`
        enemy.health -= (weaponDamage)
        message.channel.edit(Embed2.setDescription(successAttack).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
    } else {
        successAttack = `You landed a critical hit on ${enemy.name} for ${weaponDamage * 2}!`
        enemy.health -= (weaponDamage * 2)
        battleMsg.edit(Embed2.setDescription(successAttack).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
    }
} else {
    return message.channel.edit(Embed2.setDescription(`You missed ${enemy.name}!`).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
}

if(enemy.health <= 0) {
    enemy.health = 0
}

if(enemy.health <= 0) {
    attack.stop()
    flee.stop()
    enemy.health = 0
    message.channel.edit(Embed2.setColor("GREEN").setTitle('VICTORY!').setDescription(`${message.author.username} won the battle!`).setFooter(`Current Health: ${currentHealth.healthP}`))
    await utils.fightAgain(message, args, cmd, client, Discord, profileData)
    profileModel.updateOne({
        userID: message.author.id
    },
    {
        $inc: {
            xp: 100
        }
    },
    {
        new: true
    })
}

if(profileData.healthP <= 0) {
    attack.stop()
    spells.stop()
    flee.stop()
    message.channel.edit(Embed2.setColor("RED").setTitle('DEFEAT').setDescription(`${message.author.username} was defeated...!`))
    await utils.fightAgain(message, args, cmd, client, Discord, profileData)
}

let enemyDamage = enemy.dynamicDamage(enemy.weaponDamage)

if(Math.random < enemy.weaponAccuracy) {
    if(Math.random() < enemy.weaponCritical) {
        enemyDamage *=2
        enemyAction = `The ${enemy.name} lands a critical hit on you for ${enemyDamage} damage!`

    } else {
        enemyAction = `The ${enemy.name} attacked back for ${enemyDamage} damage!`
       
    }
} else {
    enemyAction = `The ${enemy.name} misses!`
    message.channel.edit(Embed2.setDescription(enemyAction).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
}
await profileModel.updateOne({
    userID: message.author.id
},
{
    $inc: {
        healthP: -enemyDamage
    }
},
{
    new: true
})
message.channel.edit(Embed2.setDescription(enemyAction).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
}