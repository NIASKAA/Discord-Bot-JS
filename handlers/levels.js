const profileModel = require('../models/profileSchema');
module.exports = (client, Discord) => {
    client.on('message', (message) => {
        const {guild, member} = message

        addXP(guild.id, member.id, 23, message) 
    })
}

const getXp = (level) => level * level * 100

const addXP = async (serverID, userID, xpToAdd, message) => {
    let currentLevel = profileModel.findOne({userID: message.author.id})
    try{
        const result = await profileModel.findOneAndUpdate({
            userID: message.author.id,
        },
        {
            $inc: {
                xp: xpToAdd
            },
        },
        {
            upsert: true
        })
        let {xp, level} = result
        const needed = getXp(level)
        if( xp >= needed) {
            ++level
            xp -= needed

            message.reply(`You are now level ${level}`)

            await profileModel.updateOne({
                userID: message.author.id
            },
            {
                level,
                xp
            })
            if(currentLevel.level >= 5) {
                profileModel.findOneAndUpdate({
                    userID: message.author.id
                },
                {
                    $push: {
                        spells: "fira"
                    },
                    $set: {
                        mDamage: 6
                    }
                },
                {
                    upsert: true
                })
                message.channel.send(`${message.author.username} learned fira!`)
            }
        
            if(currentLevel.level >= 10) {
                addPD = 2
                profileModel.findOneAndUpdate({
                    userID: message.author.id
                },
                {
                    $push: {
                        spells: "thundaga"
                    },
                    $set: {
                        mDamage: 9
                    },
                    $inc: {
                        damage: addPD
                    }
        
                },
                {
                    upsert: true
                })
                message.channel.send(`${message.author.username} learned thundaga!`)
            }
        
            if(currentLevel.level >= 13) {
                addPD = 3
                profileModel.findOneAndUpdate({
                    userID: message.author.id
                },
                {
                    $push: {
                        spells: "blizzard"
                    },
                    $set: {
                        mDamage: 13
                    },
                    $inc: {
                        damage: addPD
                    }
                },
                {
                    upsert: true
                })
                message.channel.send(`${message.author.username} learned blizzard!`)
            }
        
            if(currentLevel.level >= 16) {
                appPD = 5
                profileModel.findOneAndUpdate({
                    userID: message.author.id
                },
                {
                    $push: {
                        spells: "death"
                    },
                    $set: {
                        mDamage: 12
                    },
                    $inc: {
                        damage: addPD
                    }
                },
                {
                    upsert: true
                })
                message.channel.send(`${message.author.username} learned death!`)
            }
        }
    } catch(err) {
        console.log(err);
    }
}

module.exports.addXP = addXP