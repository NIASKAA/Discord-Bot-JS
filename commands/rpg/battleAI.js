const profileModel = require('../../models/profileSchema')
const { MessageEmbed } = require('discord.js');
const Enemy = require('../../classes/enemy');
const utils = require('../../events/utils');

module.exports.run = async(message, args, cmd, client, Discord, profileData) => {
    let currentHealth = await profileModel.findOne({userID: message.author.id})
    let weaponDamage = profileData.damage
    let magicDamage = profileData.mDamage
    const goHome = 'home'
    let enemy = new Enemy();
    let userLuck = Math.floor(Math.random() *3)
    let enemyLuck = Math.floor(Math.random() *2)
    let userCrit = Math.random()
    let critChance= Math.random()

    const question = `You find yourself in front of a ${enemy.name} with ${enemy.health} health with a ${enemy.weaponName}! Will you confront it?`
    const Embed = new MessageEmbed()
    .setColor("RED")
    .setDescription(question)
    let msg = await message.channel.send(Embed)

    await msg.react('⚔️');
    await msg.react('👟');

    const battleReact = (reaction, user) => reaction.emoji.name === '⚔️' && user.id === message.author.id;
    const runReact = (reaction, user) => reaction.emoji.name === '👟' && user.id === message.author.id;

    const battle = msg.createReactionCollector(battleReact, {time: 900000, dispose: true})
    const run = msg.createReactionCollector(runReact, {time: 900000, dispose: true})

    run.on("collect",async (erase) => {
        erase.users.remove(message.author.id);
        Embed
        .setDescription('You decided not to attack that monster')
        msg.edit(Embed)

        EmbedRun = new MessageEmbed()
        .setTitle('Status...')
        .setDescription("Going back to town")
        .setImage('https://imgur.com/KOYoNfA.png')
        await message.channel.send(EmbedRun)
        params = {
            userID: message.author.id,
        }
        profileModel.findOne(params, async(err, data) => {
            await profileModel.updateMany({
                userID: message.author.id,
            },
            {
                $set: {
                    location: goHome
                },
            },
            {
                upsert: true
            });
        })
    })
    
    battle.on("collect", async (erase) => {
        erase.users.remove(message.author.id);
        battle.stop()
        run.stop()

        const Embed2 = new MessageEmbed()
        .setColor("RED")
        .setTitle(`${message.author.username} VS ${enemy.name}`)
        .setDescription('What will you do?')
        let battleMsg = await message.channel.send(Embed2)

        await battleMsg.react('🗡️')
        await battleMsg.react('🌀');
        //await battleMsg.react('🧪')
        await battleMsg.react('👟')

        const attackReact = (reaction, user) => reaction.emoji.name === '🗡️' && user.id === message.author.id;
        const spellsReact =(reaction, user) => reaction.emoji.name === "🌀" && user.id === message.author.id;
        //const healReact = (reaction, user) => reaction.emoji.name === '🧪' && user.id === message.author.id;
        const fleeReact = (reaction, user) => reaction.emoji.name === '👟' && user.id === message.author.id;

        const attack = battleMsg.createReactionCollector(attackReact)
        const spells = battleMsg.createReactionCollector(spellsReact)
        //const heals = battleMsg.createReactionCollector(healsReact)
        const flee = battleMsg.createReactionCollector(fleeReact)

        flee.on("collect", async (erase) => {
            erase.users.remove(message.author.id);
            attack.stop()
            flee.stop()
            EmbedFlee = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`You ran away from ${enemy.name} successfully!`)
            message.channel.send(EmbedFlee);
            await utils.fightAgain(message, args, cmd, client, Discord, profileData)
        })

        spells.on("collect", async (erase) => {
            erase.users.remove(message.author.id)
            const filter = (user) => user.id = message.author.id
            battleMsg.edit(Embed2.setDescription("What spell do you want to use?").setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
            const collector = message.channel.createMessageCollector(filter, {max: 1})

            collector.on('collect', async (m) => {
                if(m.content === "fira"){
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
                        battleMsg.edit(Embed2.setImage("https://imgur.com/VW2SDxY.png").setDescription(successAttack).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }, 1000);
                    if(enemy.health <= 0) {
                        enemy.health = 0
                    }
        
                    if(enemy.health <= 0) {
                        attack.stop()
                        flee.stop()
                        enemy.health = 0
                        battleMsg.edit(Embed2.setImage("https://imgur.com/5WbehuW.png").setColor("GREEN").setTitle('VICTORY!').setDescription(`${message.author.username} won the battle!`).setFooter(`Current Health: ${currentHealth.healthP}`))
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
                        flee.stop()
                        battleMsg.edit(Embed2.setColor("RED").setTitle('DEFEAT').setDescription(`${message.author.username} was defeated...!`))
                        await utils.fightAgain(message, args, cmd, client, Discord, profileData)
                    }
                    
                    let enemyDamage = enemy.dynamicDamage(enemy.weaponDamage)
                    
                    if(enemyLuck >= userLuck) {
                        if(Math.random() <= enemy.weaponCritical) {
                            console.log(enemy.wea)
                            enemyDamage *=2
                            enemyAction = `The ${enemy.name} lands a critical hit on you for ${enemyDamage} damage!`
                        } else {
                            enemyAction = `The ${enemy.name} attacked back for ${enemyDamage} damage!`
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
                            healthP: -enemyDamage,
                            manaP: -mana
                        }
                    },
                    {
                        new: true
                    })
                } else if (m.content === "blizzard") {
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
                        flee.stop()
                        battleMsg.edit(Embed2.setColor("RED").setTitle('DEFEAT').setDescription(`${message.author.username} was defeated...!`))
                        await utils.fightAgain(message, args, cmd, client, Discord, profileData)
                    }
                    
                    let enemyDamage = enemy.dynamicDamage(enemy.weaponDamage)
                    
                    if(enemyLuck >= userLuck) {
                        if(Math.random() <= enemy.weaponCritical) {
                            console.log(enemy.wea)
                            enemyDamage *=2
                            enemyAction = `The ${enemy.name} lands a critical hit on you for ${enemyDamage} damage!`
                        } else {
                            enemyAction = `The ${enemy.name} attacked back for ${enemyDamage} damage!`
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
                            healthP: -enemyDamage,
                            manaP: -mana
                        }
                    },
                    {
                        new: true
                    })
                } else if(m.content === "thundaga") {
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
                        battleMsg.edit(Embed2.setImage("https://imgur.com/rLSziLg.png").setDescription(successAttack).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }, 1000);
                    if(enemy.health <= 0) {
                        enemy.health = 0
                    }

                    if(enemy.health <= 0) {
                        attack.stop()
                        flee.stop()
                        enemy.health = 0
                        battleMsg.edit(Embed2.setColor("GREEN").setImage('https://imgur.com/5WbehuW.png').setTitle('VICTORY!').setDescription(`${message.author.username} won the battle!`).setFooter(`Current Health: ${currentHealth.healthP}`))
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
                        flee.stop()
                        battleMsg.edit(Embed2.setColor("RED").setTitle('DEFEAT').setDescription(`${message.author.username} was defeated...!`))
                        await utils.fightAgain(message, args, cmd, client, Discord, profileData)
                    }
                    
                    let enemyDamage = enemy.dynamicDamage(enemy.weaponDamage)
                    
                    if(enemyLuck >= userLuck) {
                        if(Math.random() <= enemy.weaponCritical) {
                            console.log(enemy.wea)
                            enemyDamage *=2
                            enemyAction = `The ${enemy.name} lands a critical hit on you for ${enemyDamage} damage!`
                        } else {
                            enemyAction = `The ${enemy.name} attacked back for ${enemyDamage} damage!`
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
                            healthP: -enemyDamage,
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
                    if(userCrit <= critChance){
                    successAttack = `You attacked ${enemy.name} for ${weaponDamage }!`
                    enemy.health -= (weaponDamage)
                } else {
                    successAttack = `You landed a critical hit on ${enemy.name} for ${weaponDamage * 2}!`
                    enemy.health -= (weaponDamage * 2)
                }
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
                flee.stop()
                battleMsg.edit(Embed2.setColor("RED").setTitle('DEFEAT').setDescription(`${message.author.username} was defeated...!`))
                await utils.fightAgain(message, args, cmd, client, Discord, profileData)
            }

            let enemyDamage = enemy.dynamicDamage(enemy.weaponDamage)
            
            if(enemyLuck >= userLuck) {
                if(Math.random() <= enemy.weaponCritical) {
                    console.log(enemy.weaponCritical)
                    enemyDamage *=2
                    enemyAction = `The ${enemy.name} lands a critical hit on you for ${enemyDamage} damage!`
                } else {
                    enemyAction = `The ${enemy.name} attacked back for ${enemyDamage} damage!`
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
                    healthP: -enemyDamage
                }
            },
            {
                new: true
            })
        })
    })
}   

