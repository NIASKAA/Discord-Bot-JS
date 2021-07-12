const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: {type: String, require: true, unique: true},
    serverID: {type: String, require: true},
    coins: {type: Number, default: 1000 },
    bank: {type: Number},
    inventory: {type: Array},
    xp: {type: Number, default: 0},
    level: {type: Number, default: 1},
    spells: {type: Array},
    location: {type: Array, default: 'home'},
    weapon: {type: Array},
    healthP: {type: Number, default: 100, minimum: 0, maximum: 100},
    manaP: {type: Number, default: 100, minimum: 0, maximum: 100},
    damage: {type: Number},
    mDamage: {type: Number},
    crit: {type: Number},
    class: {type: Array},
    equip: [{
        helmet: String, armor: String, leg: String, aces: String
    }]
})

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;