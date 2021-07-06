const profileModel = require('../../models/profileSchema');

module.exports = async(client, Discord, member) => {
    let profile = await profileModel.create({
        userID: member.id,
        serverID: member.guild.id,
        coins: 1000,
        bank: 0,
        inventory: [],
        xp: 0,
        level: 1,
        healthP: 100,
        manaP: 100,
        location: ['home'],
        weapon: [],
        damage: 0
    });
    profile.save();
}