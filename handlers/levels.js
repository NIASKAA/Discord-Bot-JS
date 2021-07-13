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
            if(data.class == "Mage") {
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
            }
            if(data.class == "Warrior") {
                if(data.spells.includes("brandish")) {
                    return 
                } else {
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id
                    },
                    {
                        $push: {
                            spells: "brandish"
                        },
                        $set: {
                            damage: 6
                        }
                    },
                    {
                        upsert: true
                    })
                    message.channel.send(`${message.author.username} learned brandish!`)
                }
            }
            if(data.class === "Thief") {
                if(data.spells.includes("double stab")) {
                    return 
                } else {
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id
                    },
                    {
                        $push: {
                            spells: "double stab"
                        },
                        $set: {
                            damage: 5
                        }
                    },
                    {
                        upsert: true
                    })
                    message.channel.send(`${message.author.username} double stab!`)
                }
            }
            
        } else if(data.level === 10) {
            if(data.class == "Mage") {
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
                            mDamage: 20
                        }
                    },
                    {
                        upsert: true
                    })
                    message.channel.send(`${message.author.username} learned blizzard!`)
                }
            }

            if(data.class == "Warrior") {
                if(data.spells.includes("puncture")) {
                    return 
                } else {
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id
                    },
                    {
                        $push: {
                            spells: "puncture"
                        },
                        $set: {
                            damage: 12
                        }
                    },
                    {
                        upsert: true
                    })
                    message.channel.send(`${message.author.username} learned puncture!`)
                }
            }

            if(data.class == "Thief") {
                if(data.spells.includes("shuriken burst")) {
                    return 
                } else {
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id
                    },
                    {
                        $push: {
                            spells: "shuriken burst"
                        },
                        $set: {
                            damage: 13
                        }
                    },
                    {
                        upsert: true
                    })
                    message.channel.send(`${message.author.username} learned shuriken burst!`)
                }
            }
            
        } else if(data.level === 15) {
            if(data.class == "Mage") {
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
                            mDamage: 28
                        }
                    },
                    {
                        upsert: true
                    })
                    message.channel.send(`${message.author.username} learned thundaga!`)
                }
            }

            if(data.class == "Warrior") {
                if(data.spells.includes("rising rage")) {
                    return 
                } else {
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id
                    },
                    {
                        $push: {
                            spells: "rising rage"
                        },
                        $set: {
                            damage: 18
                        }
                    },
                    {
                        upsert: true
                    })
                    message.channel.send(`${message.author.username} learned rising rage!`)
                }
            }

            if(data.class == "Thief") {
                if(data.spells.includes("dark harmony")) {
                    return 
                } else {
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id
                    },
                    {
                        $push: {
                            spells: "dark harmony"
                        },
                        $set: {
                            damage: 18,
                            crit: 4
                        }
                    },
                    {
                        upsert: true
                    })
                    message.channel.send(`${message.author.username} learned dark harmony!`)
                }
            }
        } else if(data.level === 20) {
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
                        mDamage: 32
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