const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'craft',
    description: 'craft new items',
    async execute(message, args, cmd, client, Discord, profileData) {
        const arg = args.join(" ")
        const itemToCraft = arg;
        if(!itemToCraft) return message.reply("At least tell me what to craft...")
    }
}