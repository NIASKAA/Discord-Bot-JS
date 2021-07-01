const profileModel = require('../models/profileSchema');

module.exports = {
    name: "give",
    description: "Give a user some money",
    async execute(message, args, cmd, client, Discord, profileData) {
        if(!args.length) return message.channel.send('You need to mention a player to give them coins brah');
        const amount = args[1];
        const target = message.mentions.users.first();
        if(!target) return message.channel.send('User does not exist brah');

        if(amount % 1 != 0 || amount <= 0) return message.channel.send("Deposit must be a whole number brah")
        try{
            const targetData = await profileModel.findOne({
                userID: target.id
            });
            if(!targetData) return message.channel.send("This user doesn't exist");
            await profileModel.findOneAndUpdate({
                userID: target.id,
            },
            {
                $inc: {
                    coins: amount,
                },
            });
            return message.channel.send(`User got ${amount}`)
        } catch(err) {
            console.log(err);
        }
    }
}