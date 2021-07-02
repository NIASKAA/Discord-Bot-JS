const profileModel = require('../models/profileSchema');
module.exports = (client, Discord) => {
    client.on('message', (message) => {
        const {guild, member} = message

        addXP(guild.id, member.id, 23, message) 
    })
}

const getXp = (level) => level * level * 100

const addXP = async (serverID, userID, xpToAdd, message) => {
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
            upsert: true,
            new: true
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
    } catch(err) {
        console.log(err);
    }
}

module.exports.addXP = addXP