const profileModel = require('../../models/profileSchema')
const { MessageEmbed } = require('discord.js');
const Enemy = require('../../classes/enemy');
const utils = require('../../events/utils');

module.exports.run = async(message, args, cmd, client, Discord, profileData) => {
    let weaponDamage = profileData.damage
    let magicDamage = profileData.mDamage
    const goHome = 'home'
    let enemy = new Enemy();
    let userLuck = Math.floor(Math.random() *3)
    let enemyLuck = Math.floor(Math.random() *2)
    let userCrit = Math.random()
    let critChance= Math.random()

    const question = `You find yourself in front of a ${enemy.name} with ${enemy.health} health and a ${enemy.weaponName}! Will you confront it?`
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
        .setDescription("Going back home")
        .setImage('https://imgur.com/si7QsRB.png')
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
        //await battleMsg.react('🧪');
        await battleMsg.react('👟')

        const attackReact = (reaction, user) => reaction.emoji.name === '🗡️' && user.id === message.author.id;
        const spellsReact = (reaction, user) => reaction.emoji.name === '🌀' && user.id === message.author.id;
        //const healsReact = (reaction, user) => reaction.emoji.name === '🧪' && user.id === message.author.id;
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

        /*heals.on("collect", async (erase) => {
            erase.users.remove(message.author.id)
            const filter = (user) => user.id = message.author.id
            message.channel.send('What items do you want to use?')
            const healCollector = message.channel.createMessageCollector(filter)

            healCollector.on('collect', async(m) => {
                let currentHealth = await profileModel.findOne({userID: message.author.id})
                if(m.content === "health potion") {
                    if(currentHealth.inventory.find((x) => x.toLowerCase() === "health potion") === undefined ) {
                        return battleMsg.edit(Embed2.setDescription("You don't have that item!").setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }
                    addHealth = {
                        $add:[
                            "$healthP", 50,
                        ]}
                    onefewerItem = { 
                        $reduce : { 
                            input: "$inventory", 
                    initialValue: {
                        stilllooking:true, 
                        i:[] 
                    } , 
                    in :{ 
                        $cond  :
                        { if: 
                            {$and : 
                                [{
                                    $eq : 
                                    [
                                        "$$this","health potion"
                                ]},
                                    "$$value.stilllooking"
                                ]} , 
                                  then: {stilllooking:false, i:"$$value.i"},
                                  else : { stilllooking:"$$value.stilllooking", i: {$concatArrays:["$$value.i",["$$this"]]}}}}}}
        
                    changes = [{
                        $set : 
                        { 
                            healthP: addHealth,
                            inventory: onefewerItem
                        }
                    },
                    {
                        $set: 
                        {
                            inventory:"$inventory.i"
                        }
                    }]
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id
                    }, changes)
                    healCollector.stop()
                return battleMsg.edit(Embed2.setDescription(`You used the item!`).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                } else if (m.content === "borgor") {
                    if(profileData.inventory.find((x) => x.toLowerCase() === "borgor") === undefined ) {
                        return battleMsg.edit(Embed2.setDescription("You don't have that item!").setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }
                    addHealth = {
                        $add:[
                            "$healthP", 30,
                        ]}
                    addMana = {
                        $add:[
                            "$manaP", 20
                        ]
                    }
                    onefewerItem = { 
                        $reduce : { 
                            input: "$inventory", 
                    initialValue: {
                        stilllooking:true, 
                        i:[] 
                    } , 
                    in :{ 
                        $cond  :
                        { if: 
                            {$and : 
                                [{
                                    $eq : 
                                    [
                                        "$$this","borgor"
                                ]},
                                    "$$value.stilllooking"
                                ]} , 
                                  then: {stilllooking:false, i:"$$value.i"},
                                  else : { stilllooking:"$$value.stilllooking", i: {$concatArrays:["$$value.i",["$$this"]]}}}}}}
        
                    changes = [{
                        $set : 
                        { 
                            healthP: addHealth,
                            manaP: addMana,
                            inventory: onefewerItem
                        }
                    },
                    {
                        $set: 
                        {
                            inventory:"$inventory.i"
                        }
                    }]
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id
                    }, changes)
                } else if(m.content === "ramen") {
                    if(profileData.inventory.find((x) => x.toLowerCase() === "ramen") === undefined ) {
                        return battleMsg.edit(Embed2.setDescription("You don't have that item!").setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }
                    addHealth = {
                        $add:[
                            "$healthP", 60,
                        ]}
                    addMana = {
                        $add:[
                            "$manaP", 50
                        ]
                    }
                    onefewerItem = { 
                        $reduce : { 
                            input: "$inventory", 
                    initialValue: {
                        stilllooking:true, 
                        i:[] 
                    } , 
                    in :{ 
                        $cond  :
                        { if: 
                            {$and : 
                                [{
                                    $eq : 
                                    [
                                        "$$this","ramen"
                                ]},
                                    "$$value.stilllooking"
                                ]} , 
                                  then: {stilllooking:false, i:"$$value.i"},
                                  else : { stilllooking:"$$value.stilllooking", i: {$concatArrays:["$$value.i",["$$this"]]}}}}}}
        
                    changes = [{
                        $set : 
                        { 
                            healthP: addHealth,
                            manaP: addMana,
                            inventory: onefewerItem
                        }
                    },
                    {
                        $set: 
                        {
                            inventory:"$inventory.i"
                        }
                    }]
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id
                    }, changes)
                } else if (m.content === "mana potion") {
                    if(profileData.inventory.find((x) => x.toLowerCase() === "mana potion") === undefined ) {
                        return battleMsg.edit(Embed2.setDescription("You don't have that item!").setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }
                    addMana = {
                        $add:[
                            "$manaP", 50,
                        ]}
                    onefewerItem = { 
                        $reduce : { 
                            input: "$inventory", 
                    initialValue: {
                        stilllooking:true, 
                        i:[] 
                    } , 
                    in :{ 
                        $cond  :
                        { if: 
                            {$and : 
                                [{
                                    $eq : 
                                    [
                                        "$$this","mana potion"
                                ]},
                                    "$$value.stilllooking"
                                ]} , 
                                  then: {stilllooking:false, i:"$$value.i"},
                                  else : { stilllooking:"$$value.stilllooking", i: {$concatArrays:["$$value.i",["$$this"]]}}}}}}
        
                    changes = [{
                        $set : 
                        { 
                            manaP: addMana,
                            inventory: onefewerItem
                        }
                    },
                    {
                        $set: 
                        {
                            inventory:"$inventory.i"
                        }
                    }]
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id
                    }, changes)
                } else if (m.content === "medium health potion") {
                    if(profileData.inventory.find((x) => x.toLowerCase() === "medium health potion") === undefined ) {
                        return battleMsg.edit(Embed2.setDescription("You don't have that item!").setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }
                    addHealth = {
                        $add:[
                            "$healthP", 80,
                        ]}
                    onefewerItem = { 
                        $reduce : { 
                            input: "$inventory", 
                    initialValue: {
                        stilllooking:true, 
                        i:[] 
                    } , 
                    in :{ 
                        $cond  :
                        { if: 
                            {$and : 
                                [{
                                    $eq : 
                                    [
                                        "$$this","medium health potion"
                                ]},
                                    "$$value.stilllooking"
                                ]} , 
                                  then: {stilllooking:false, i:"$$value.i"},
                                  else : { stilllooking:"$$value.stilllooking", i: {$concatArrays:["$$value.i",["$$this"]]}}}}}}
        
                    changes = [{
                        $set : 
                        { 
                            healthP: addHealth,
                            inventory: onefewerItem
                        }
                    },
                    {
                        $set: 
                        {
                            inventory:"$inventory.i"
                        }
                    }]
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id
                    }, changes)
                } else if (m.content === "medium mana potion") {
                    if(profileData.inventory.find((x) => x.toLowerCase() === "health potion") === undefined ) {
                        return battleMsg.edit(Embed2.setDescription("You don't have that item!").setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }
                    addHealth = {
                        $add:[
                            "$manaP", 80,
                        ]}
                    onefewerItem = { 
                        $reduce : { 
                            input: "$inventory", 
                    initialValue: {
                        stilllooking:true, 
                        i:[] 
                    } , 
                    in :{ 
                        $cond  :
                        { if: 
                            {$and : 
                                [{
                                    $eq : 
                                    [
                                        "$$this","medium mana potion"
                                ]},
                                    "$$value.stilllooking"
                                ]} , 
                                  then: {stilllooking:false, i:"$$value.i"},
                                  else : { stilllooking:"$$value.stilllooking", i: {$concatArrays:["$$value.i",["$$this"]]}}}}}}
        
                    changes = [{
                        $set : 
                        { 
                            manaP: addMana,
                            inventory: onefewerItem
                        }
                    },
                    {
                        $set: 
                        {
                            inventory:"$inventory.i"
                        }
                    }]
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id
                    }, changes)
                    healCollector.stop()
                return battleMsg.edit(Embed2.setDescription(`You used the item!`).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                }
                
            })
        })*/
        spells.on("collect", async (erase) => {
            erase.users.remove(message.author.id)
            const filter = (user) => user.id = message.author.id
            message.channel.send('What spells do you want to use?')
            const collector = message.channel.createMessageCollector(filter)

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
                        battleMsg.edit(Embed2.setDescription(successAttack).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                        } else {
                            successAttack = `You landed a critical hit on ${enemy.name} for ${magicDamage * 2}!`
                            enemy.health -= (magicDamage* 2)
                            battleMsg.edit(Embed2.setDescription(successAttack).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                        }
                    } else {
                        return battleMsg.edit(Embed2.setDescription(`You missed ${enemy.name}!`).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }
                    
                    if(enemy.health <= 0) {
                        enemy.health = 0
                    }
        
                    if(enemy.health <= 0) {
                        attack.stop()
                        flee.stop()
                        enemy.health = 0
                        battleMsg.edit(Embed2.setColor("GREEN").setTitle('VICTORY!').setDescription(`${message.author.username} won the battle!`).setFooter(`Current Health: ${currentHealth.healthP}`))
                        collector.stop()
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
                        collector.stop()
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
                        battleMsg.edit(Embed2.setDescription(enemyAction).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }
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
                    battleMsg.edit(Embed2.setDescription(enemyAction).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                } else if (m.content === "blizzard") {
                    let currentHealth = await profileModel.findOne({userID: message.author.id})
                    let mana = 30
                    if(profileData.spells.find((x) => x.toLowerCase() === "blizzard") === undefined ) {
                        return battleMsg.edit(Embed2.setDescription("You didn't learn this spell yet...").setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }
                    if(currentHealth.manaP < 0) {
                        return battleMsg.edit(Embed2.setDescription("No mana"))
                    }
                    if(userLuck >= enemyLuck) {
                        if(userCrit <= critChance){
                        successAttack = `You attacked ${enemy.name} with fira for ${magicDamage}!`
                        enemy.health -= (magicDamage)
                        battleMsg.edit(Embed2.setDescription(successAttack).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                        } else {
                            successAttack = `You landed a critical hit on ${enemy.name} for ${magicDamage * 2}!`
                            enemy.health -= (magicDamage* 2)
                            battleMsg.edit(Embed2.setDescription(successAttack).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                        }
                    } else {
                        return battleMsg.edit(Embed2.setDescription(`You missed ${enemy.name}!`).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }
                    
                    if(enemy.health <= 0) {
                        enemy.health = 0
                    }
        
                    if(enemy.health <= 0) {
                        attack.stop()
                        flee.stop()
                        enemy.health = 0
                        battleMsg.edit(Embed2.setColor("GREEN").setTitle('VICTORY!').setDescription(`${message.author.username} won the battle!`).setFooter(`Current Health: ${currentHealth.healthP}`))
                        collector.stop()
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
                        collector.stop()
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
                        battleMsg.edit(Embed2.setDescription(enemyAction).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }
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
                    battleMsg.edit(Embed2.setDescription(enemyAction).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                } else if (m.content === "thundaga") {
                    let currentHealth = await profileModel.findOne({userID: message.author.id})
                    let mana = 25
                    if(profileData.spells.find((x) => x.toLowerCase() === "thundaga") === undefined ) {
                        return battleMsg.edit(Embed2.setDescription("You didn't learn this spell yet...").setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }
                    if(currentHealth.manaP < 0) {
                        return battleMsg.edit(Embed2.setDescription("No mana"))
                    }
                    if(userLuck >= enemyLuck) {
                        let userCrit = Math.random()
                        let critChance= Math.random()
                            if(userCrit <= critChance){
                            successAttack = `You attacked ${enemy.name} with thundaga for ${magicDamage }!`
                            enemy.health -= (magicDamage)
                            battleMsg.edit(Embed2.setDescription(successAttack).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                        } else {
                            successAttack = `You landed a critical hit on ${enemy.name} for ${magicDamage * 2}!`
                            enemy.health -= (magicDamage* 2)
                            battleMsg.edit(Embed2.setDescription(successAttack).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                        }
                    } else {
                        return battleMsg.edit(Embed2.setDescription(`You missed ${enemy.name}!`).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }
        
                    if(enemy.health <= 0) {
                        enemy.health = 0
                    }
        
                    if(enemy.health <= 0) {
                        attack.stop()
                        flee.stop()
                        enemy.health = 0
                        battleMsg.edit(Embed2.setColor("GREEN").setTitle('VICTORY!').setDescription(`${message.author.username} won the battle!`).setFooter(`Current Health: ${currentHealth.healthP}`))
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
                    
                    if(Math.random < enemy.weaponAccuracy) {
                        if(Math.random() < enemy.weaponCritical) {
                            enemyDamage *=2
                            enemyAction = `The ${enemy.name} lands a critical hit on you for ${enemyDamage} damage!`
        
                        } else {
                            enemyAction = `The ${enemy.name} attacked back for ${enemyDamage} damage!`
                           
                        }
                    } else {
                        enemyAction = `The ${enemy.name} misses!`
                        battleMsg.edit(Embed2.setDescription(enemyAction).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }
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
                    battleMsg.edit(Embed2.setDescription(enemyAction).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                } else if (m.content === "death") {
                    let currentHealth = await profileModel.findOne({userID: message.author.id})
                    let mana = 35

                    if(profileData.spells.find((x) => x.toLowerCase() === "death") === undefined ) {
                        return battleMsg.edit(Embed2.setDescription("You didn't learn this spell yet...").setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }
                    if(currentHealth.manaP < 0) {
                        return battleMsg.edit(Embed2.setDescription("No mana"))
                    }
                    if(userLuck >= enemyLuck) {
                        let userCrit = Math.random()
                        let critChance= Math.random()
                            if(userCrit <= critChance){
                            successAttack = `You attacked ${enemy.name} with death for ${magicDamage}!`
                            enemy.health -= (magicDamage)
                            battleMsg.edit(Embed2.setDescription(successAttack).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                        } else {
                            successAttack = `You landed a critical hit on ${enemy.name} for ${magicDamage * 2}!`
                            enemy.health -= (weaponDamage * 2)
                            battleMsg.edit(Embed2.setDescription(successAttack).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                        }
                    } else {
                        return battleMsg.edit(Embed2.setDescription(`You missed ${enemy.name}!`).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }
        
                    if(enemy.health <= 0) {
                        enemy.health = 0
                    }
        
                    if(enemy.health <= 0) {
                        attack.stop()
                        flee.stop()
                        enemy.health = 0
                        battleMsg.edit(Embed2.setColor("GREEN").setTitle('VICTORY!').setDescription(`${message.author.username} won the battle!`).setFooter(`Current Health: ${currentHealth.healthP}`))
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
                    
                    if(Math.random < enemy.weaponAccuracy) {
                        if(Math.random() < enemy.weaponCritical) {
                            enemyDamage *=2
                            enemyAction = `The ${enemy.name} lands a critical hit on you for ${enemyDamage} damage!`
        
                        } else {
                            enemyAction = `The ${enemy.name} attacked back for ${enemyDamage} damage!`
                           
                        }
                    } else {
                        enemyAction = `The ${enemy.name} misses!`
                        battleMsg.edit(Embed2.setDescription(enemyAction).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                    }
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
                    battleMsg.edit(Embed2.setDescription(enemyAction).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
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
                    battleMsg.edit(Embed2.setDescription(successAttack).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                } else {
                    successAttack = `You landed a critical hit on ${enemy.name} for ${weaponDamage * 2}!`
                    enemy.health -= (weaponDamage * 2)
                    battleMsg.edit(Embed2.setDescription(successAttack).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
                }
            } else {
                return battleMsg.edit(Embed2.setDescription(`You missed ${enemy.name}!`).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
            }

            if(enemy.health <= 0) {
                enemy.health = 0
            }

            if(enemy.health <= 0) {
                attack.stop()
                flee.stop()
                enemy.health = 0
                battleMsg.edit(Embed2.setColor("GREEN").setTitle('VICTORY!').setDescription(`${message.author.username} won the battle!`).setFooter(`Current Health: ${currentHealth.healthP}`))
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
            
            if(Math.random < enemy.weaponAccuracy) {
                if(Math.random() < enemy.weaponCritical) {
                    enemyDamage *=2
                    enemyAction = `The ${enemy.name} lands a critical hit on you for ${enemyDamage} damage!`

                } else {
                    enemyAction = `The ${enemy.name} attacked back for ${enemyDamage} damage!`
                   
                }
            } else {
                enemyAction = `The ${enemy.name} misses!`
                battleMsg.edit(Embed2.setDescription(enemyAction).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
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
            battleMsg.edit(Embed2.setDescription(enemyAction).setFooter(`Your Health: ${currentHealth.healthP} | Enemy Health: ${enemy.health}`))
        })
    })
}   

