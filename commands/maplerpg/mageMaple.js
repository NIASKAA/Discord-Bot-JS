const profileModel = require('../../models/profileSchema')
const { MessageEmbed } = require('discord.js');
const Enemy = require('../../classes/enemy');
const utils = require('../../events/utils');

module.exports.run = async(message, args, cmd, client, Discord, profileData) => {
    let currentHealth = await profileModel.findOne({userID: message.author.id})
    let weaponDamage = profileData.damage
    let magicDamage = profileData.mDamage
    let defense = profileData.defense
    let enemy = new Enemy();
    let userLuck = Math.floor(Math.random() *3)
    let enemyLuck = Math.floor(Math.random() *2)
    let userCrit = Math.random()
    let critChance= Math.random()

    const question = `You find yourself in front of a ${enemy.name} with ${enemy.health} health with a ${enemy.weaponName}! Fight it!`
    const Embed = new MessageEmbed()
    .setColor("RED")
    .setDescription(question)
    .setThumbnail(`${enemy.image}`)
    let msg = await message.channel.send(Embed)

    await msg.react('⚔️');

    const battleReact = (reaction, user) => reaction.emoji.name === '⚔️' && user.id === message.author.id;

    const battle = msg.createReactionCollector(battleReact, {time: 900000, dispose: true})
    
    battle.on("collect", async (erase) => {
        erase.users.remove(message.author.id);
        battle.stop()
    
        const Embed2 = new MessageEmbed()
        .setColor("RED")
        .setTitle(`${message.author.username} VS ${enemy.name}`)
        .setDescription('What will you do?')
        let battleMsg = await message.channel.send(Embed2)

        await battleMsg.react('🗡️')
        await battleMsg.react('🌀')

        const attackReact = (reaction, user) => reaction.emoji.name === '🗡️' && user.id === message.author.id;
        const spellsReact =(reaction, user) => reaction.emoji.name === "🌀" && user.id === message.author.id;

        const attack = battleMsg.createReactionCollector(attackReact)
        const spells = battleMsg.createReactionCollector(spellsReact)

        spells.on("collect", async (erase) => {
            erase.users.remove(message.author.id)
            const filter = (user) => user.id = message.author.id
            battleMsg.edit(Embed2.setDescription("What spell do you want to use?").setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
            const collector = message.channel.createMessageCollector(filter, {max: 1})

            collector.on('collect', async (m) => {
                if(m.content === "fira" || "Fira"){
                    let currentHealth = await profileModel.findOne({userID: message.author.id})
                    let mana = 20
                    if(profileData.spells.find((x) => x.toLowerCase() === "fira") === undefined ) {
                        return battleMsg.edit(Embed2.setDescription("You didn't learn this spell yet...").setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }
                    if(currentHealth.manaP < 0) {
                        return battleMsg.edit(Embed2.setDescription("No mana"))
                    }
                    if(userLuck >= enemyLuck) {
                        if(userCrit <= critChance){
                        successAttack = `You attacked ${enemy.name} with fira for ${magicDamage}!`
                        enemy.health -= (magicDamage)
                        } else {
                            successAttack = `You landed a critical hit on ${enemy.name} for ${magicDamage * 2}!`
                            enemy.health -= (magicDamage* 2)
                        }
                    } else {
                        successAttack = `You missed ${enemy.name}!`
                    }
                    setTimeout(() => {
                        battleMsg.edit(Embed2.setImage("https://imgur.com/Nv0CaXX.png").setDescription(successAttack).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }, 1000);
                    if(enemy.health <= 0) {
                        enemy.health = 0
                    }
        
                    if(enemy.health <= 0) {
                        attack.stop()
                        flee.stop()
                        enemy.health = 0
                        battleMsg.edit(Embed2.setImage("https://imgur.com/5WbehuW.png").setColor("GREEN").setTitle('VICTORY!').setDescription(`${message.author.username} won the battle!`).setFooter(`Current Health: ${currentHealth.healthP}`))
                        await utils.mapleAgain(message, args, cmd, client, Discord, profileData)
                        await profileModel.updateOne({
                            userID: message.author.id
                        },
                        {
                            $inc: {
                                xp: 150,
                                coins: 250
                            }
                        },
                        {
                            new: true
                        })
                    }
        
                    if(profileData.healthP <= 0) {
                        attack.stop()
                        flee.stop()
                        battleMsg.edit(Embed2.setColor("RED").setTitle('DEFEAT').setDescription(`${message.author.username} was defeated...!`))
                        await utils.mapleAgain(message, args, cmd, client, Discord, profileData)
                    }
                    
                    let enemyDamage = enemy.dynamicDamage(enemy.weaponDamage)
                    let newDamage = enemyDamage - defense
                    if(enemyLuck >= userLuck) {
                        if(Math.random() <= enemy.weaponCritical) {
                            newDamage *=2
                            enemyAction = `The ${enemy.name} lands a critical hit on you for ${newDamage} damage!`
                        } else {
                            enemyAction = `The ${enemy.name} attacked back for ${newDamage} damage!`
                        }
                    } else {
                        enemyAction = `The ${enemy.name} misses!`
                    }
                    setTimeout(() => {
                        battleMsg.edit(Embed2.setImage("https://imgur.com/rS8bXq0.png").setDescription(enemyAction).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }, 3000);
                    await profileModel.updateOne({
                        userID: message.author.id
                    },
                    {
                        $inc: {
                            healthP: -newDamage,
                            manaP: -mana
                        }
                    },
                    {
                        new: true
                    })
                } else if (m.content === "blizzard" || "Blizzard") {
                    let currentHealth = await profileModel.findOne({userID: message.author.id})
                    let mana = 25
                    if(profileData.spells.find((x) => x.toLowerCase() === "blizzard") === undefined ) {
                        return battleMsg.edit(Embed2.setDescription("You didn't learn this spell yet...").setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }
                    if(currentHealth.manaP < 0) {
                        return battleMsg.edit(Embed2.setDescription("No mana"))
                    }
                    if(userLuck >= enemyLuck) {
                        if(userCrit <= critChance){
                        successAttack = `You attacked ${enemy.name} with blizzard for ${magicDamage}!`
                        enemy.health -= (magicDamage)
                        } else {
                            successAttack = `You landed a critical hit on ${enemy.name} for ${magicDamage * 2}!`
                            enemy.health -= (magicDamage* 2)
                        }
                    } else {
                        successAttack = `You missed ${enemy.name}!`
                    }
                    setTimeout(() => {
                        battleMsg.edit(Embed2.setImage("https://imgur.com/tdc1xRv.png").setDescription(successAttack).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }, 2000);

                    if(enemy.health <= 0) {
                        enemy.health = 0
                    }

                    if(enemy.health <= 0) {
                        attack.stop()
                        flee.stop()
                        enemy.health = 0
                        battleMsg.edit(Embed2.setImage('https://imgur.com/5WbehuW.png').setColor("GREEN").setTitle('VICTORY!').setDescription(`${message.author.username} won the battle!`).setFooter(`Current Health: ${currentHealth.healthP}`))
                        await utils.mapleAgain(message, args, cmd, client, Discord, profileData)
                        await profileModel.updateOne({
                            userID: message.author.id
                        },
                        {
                            $inc: {
                                xp: 150,
                                coins: 250
                            }
                        },
                        {
                            new: true
                        })
                    }

                    if(profileData.healthP <= 0) {
                        attack.stop()
                        flee.stop()
                        battleMsg.edit(Embed2.setColor("RED").setTitle('DEFEAT').setDescription(`${message.author.username} was defeated...!`))
                        await utils.mapleAgain(message, args, cmd, client, Discord, profileData)
                    }
                    
                    let enemyDamage = enemy.dynamicDamage(enemy.weaponDamage)
                    let newDamage = enemyDamage - defense
                    if(enemyLuck >= userLuck) {
                        if(Math.random() <= enemy.weaponCritical) {
                            newDamage *=2
                            enemyAction = `The ${enemy.name} lands a critical hit on you for ${newDamage} damage!`
                        } else {
                            enemyAction = `The ${enemy.name} attacked back for ${newDamage} damage!`
                        }
                    } else {
                        enemyAction = `The ${enemy.name} misses!`
                    }
                    setTimeout(() => {
                        battleMsg.edit(Embed2.setImage("https://imgur.com/wBMktTK.png").setDescription(enemyAction).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }, 3000);
                    await profileModel.updateOne({
                        userID: message.author.id
                    },
                    {
                        $inc: {
                            healthP: -newDamage,
                            manaP: -mana
                        }
                    },
                    {
                        new: true
                    })
                } else if(m.content === "thundaga" || "Thundaga") {
                    let currentHealth = await profileModel.findOne({userID: message.author.id})
                    let mana = 25
                    if(profileData.spells.find((x) => x.toLowerCase() === "thundaga") === undefined ) {
                        return battleMsg.edit(Embed2.setDescription("You didn't learn this spell yet...").setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }
                    if(currentHealth.manaP < 0) {
                        return battleMsg.edit(Embed2.setDescription("No mana"))
                    }
                    if(userLuck >= enemyLuck) {
                        if(userCrit <= critChance){
                        successAttack = `You attacked ${enemy.name} with thundaga for ${magicDamage}!`
                        enemy.health -= (magicDamage)
                        } else {
                            successAttack = `You landed a critical hit on ${enemy.name} for ${magicDamage * 2}!`
                            enemy.health -= (magicDamage* 2)
                        }
                    } else {
                        successAttack = `You missed ${enemy.name}!`
                    }
                    setTimeout(() => {
                        battleMsg.edit(Embed2.setImage("https://imgur.com/VGaPXyy.png").setDescription(successAttack).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }, 1000);
                    if(enemy.health <= 0) {
                        enemy.health = 0
                    }

                    if(enemy.health <= 0) {
                        attack.stop()
                        flee.stop()
                        enemy.health = 0
                        battleMsg.edit(Embed2.setColor("GREEN").setImage('https://imgur.com/5WbehuW.png').setTitle('VICTORY!').setDescription(`${message.author.username} won the battle!`).setFooter(`Current Health: ${currentHealth.healthP}`))
                        await utils.mapleAgain(message, args, cmd, client, Discord, profileData)
                        await profileModel.updateOne({
                            userID: message.author.id
                        },
                        {
                            $inc: {
                                xp: 150,
                                coins: 250
                            }
                        },
                        {
                            new: true
                        })
                    }

                    if(profileData.healthP <= 0) {
                        attack.stop()
                        flee.stop()
                        battleMsg.edit(Embed2.setColor("RED").setTitle('DEFEAT').setDescription(`${message.author.username} was defeated...!`))
                        await utils.mapleAgain(message, args, cmd, client, Discord, profileData)
                    }
                    
                    let enemyDamage = enemy.dynamicDamage(enemy.weaponDamage)
                    let newDamage = enemyDamage - defense
                    if(enemyLuck >= userLuck) {
                        if(Math.random() <= enemy.weaponCritical) {
                            newDamage *=2
                            enemyAction = `The ${enemy.name} lands a critical hit on you for ${newDamage} damage!`
                        } else {
                            enemyAction = `The ${enemy.name} attacked back for ${newDamage} damage!`
                        }
                    } else {
                        enemyAction = `The ${enemy.name} misses!`
                    }
                    setTimeout(() => {
                        battleMsg.edit(Embed2.setImage("https://imgur.com/rS8bXq0.png").setDescription(enemyAction).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }, 3000);
                    await profileModel.updateOne({
                        userID: message.author.id
                    },
                    {
                        $inc: {
                            healthP: -newDamage,
                            manaP: -mana
                        }
                    },
                    {
                        new: true
                    })
                }
            })
        })
        
        attack.on("collect", async (erase) => {
            erase.users.remove(message.author.id);
            let currentHealth = await profileModel.findOne({userID: message.author.id})
            
            if(userLuck >= enemyLuck) {
                successAttack = `You attacked ${enemy.name} for ${weaponDamage}!`
                enemy.health -= (weaponDamage)
            } else {
                successAttack = `You missed ${enemy.name}!`
            }
            setTimeout(() => {
                battleMsg.edit(Embed2.setImage("https://imgur.com/BSxWFZU.png").setDescription(successAttack).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
            }, 1000);

            if(enemy.health <= 0) {
                enemy.health = 0
            }

            if(enemy.health <= 0) {
                attack.stop()
                flee.stop()
                enemy.health = 0
                setTimeout(() => {
                    battleMsg.edit(Embed2.setImage('https://imgur.com/5WbehuW.png').setColor("GREEN").setTitle('VICTORY!').setDescription(`${message.author.username} won the battle!`).setFooter(`Current Health: ${currentHealth.healthP}`))
                }, 3000)
                await utils.mapleAgain(message, args, cmd, client, Discord, profileData)
                await profileModel.updateOne({
                    userID: message.author.id
                },
                {
                    $inc: {
                        xp: 150,
                        coins: 250
                    }
                },
                {
                    new: true
                })
            }

            if(profileData.healthP <= 0) {
                attack.stop()
                flee.stop()
                battleMsg.edit(Embed2.setColor("RED").setTitle('DEFEAT').setDescription(`${message.author.username} was defeated...!`))
                await utils.mapleAgain(message, args, cmd, client, Discord, profileData)
            }

            let enemyDamage = enemy.dynamicDamage(enemy.weaponDamage)
            let newDamage = enemyDamage - defense
            if(enemyLuck >= userLuck) {
                if(Math.random() <= enemy.weaponCritical) {
                    newDamage *=2
                    enemyAction = `The ${enemy.name} lands a critical hit on you for ${newDamage} damage!`
                } else {
                    enemyAction = `The ${enemy.name} attacked back for ${newDamage} damage!`
                }
            } else {
                enemyAction = `The ${enemy.name} misses!`
            }
            setTimeout(() => {
                battleMsg.edit(Embed2.setImage("https://imgur.com/rS8bXq0.png").setDescription(enemyAction).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
            }, 3000);
            await profileModel.updateOne({
                userID: message.author.id
            },
            {
                $inc: {
                    healthP: -newDamage
                }
            },
            {
                new: true
            })
        })
    })
}   

