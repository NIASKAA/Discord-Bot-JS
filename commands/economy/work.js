const profileModel = require('../../models/profileSchema');

module.exports = {
    name: 'work',
    cooldown: 1800,
    description: 'Work your ass off please',
    async execute(message, args, cmd, client, Discord, profileData) {
        const jobs = [
            'Software Developer', 
            'Popo', 
            'Doctor', 
            'Crackhead', 
            'Mechanic', 
            'Miner', 
            'Poop Collector',
            'Priest',
            'barista',
            'granny fighter',
            'thief'
        ];

        const jobList = Math.floor(Math.random() * jobs.length);
        const dailyPay = Math.floor(Math.random() * 1000) + 1;
        const response = await profileModel.findOneAndUpdate({
            userID: message.author.id,
        },
        {
            $inc: {
                coins: dailyPay,
            }
        });
        return message.channel.send(`You worked as a ${jobs[jobList]} and earned ${dailyPay}!`);
    }
}