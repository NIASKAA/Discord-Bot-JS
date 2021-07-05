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
        health: 100,
        mana: 100
    });
    profile.save();
}