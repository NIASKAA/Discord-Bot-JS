const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    userID: {type: String, require: true, unique: true},
    serverID: {type: String, require: true},
    coins: {type: Number, default: 1000 },
    bank: {type: Number},
    inventory: {type: Array},
    xp: {type: Number, default: 0},
    level: {type: Number, default: 1},
    health: {type: Number, default: 100, min: 0, max: 100},
    mana: {type: Number, default: 100, min: 0, max: 100}
})

const model = mongoose.model('ProfileModels', profileSchema);

module.exports = model;