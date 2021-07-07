const profileModel = require('../../models/profileSchema');

module.exports.run = async(message, args, cmd, client, Discord, profileData) => {
    if(profileData.level === 5) {
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

    if(profileData.level === 10) {
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

    if(profileData.level === 13) {
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

    if(profileData.level === 16) {
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