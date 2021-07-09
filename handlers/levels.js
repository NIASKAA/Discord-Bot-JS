const profileModel = require('../models/profileSchema');
module.exports = (client, Discord) => {
    client.on('message', (message) => {
        const {guild, member} = message

        addXP(guild.id, member.id, 23, message) 
    })
}

const getXp = (level) => level * level * 100

const addXP = async (serverID, userID, xpToAdd, message) => {
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
        }
    params = {
        userID: message.author.id,
    }
    profileModel.findOne(params, async(err, data) => {
        if(data.level ===  5) {
            if(data.spells.includes("fira")) {
                return 
            } else {
                await profileModel.findOneAndUpdate({
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
            
        } else if(data.level === 10) {
            if(data.spells.includes("blizzard")) {
                return 
            } else {
                await profileModel.findOneAndUpdate({
                    userID: message.author.id
                },
                {
                    $push: {
                        spells: "blizzard"
                    },
                    $set: {
                        mDamage: 18
                    }
                },
                {
                    upsert: true
                })
                message.channel.send(`${message.author.username} learned blizzard!`)
            }
            
        } else if(data.level === 13) {
            if(data.spells.includes("thundaga")) {
                return 
            } else {
                await profileModel.findOneAndUpdate({
                    userID: message.author.id
                },
                {
                    $push: {
                        spells: "thundaga"
                    },
                    $set: {
                        mDamage: 18
                    }
                },
                {
                    upsert: true
                })
                message.channel.send(`${message.author.username} learned thundaga!`)
            }
        } else if(data.level === 16) {
            if(data.spells.includes("death")) {
                return 
            } else {
                await profileModel.findOneAndUpdate({
                    userID: message.author.id
                },
                {
                    $push: {
                        spells: "death"
                    },
                    $set: {
                        mDamage: 18
                    }
                },
                {
                    upsert: true
                })
                message.channel.send(`${message.author.username} learned death!`)
            }
        }
    })
}
module.exports.addXP = addXP