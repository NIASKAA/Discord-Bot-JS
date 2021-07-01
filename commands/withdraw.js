const profileModel = require('../models/profileSchema');

module.exports = {
    name: "withdraw",
    description: 'withdraw from your bank',
    async execute(message, args, cmd, client, Discord, profileData) {
        const amount = args[0];
        if(amount % 1 != 0 || amount <= 0) return message.channel.send("Deposit amount must be a whole number");
        try{
            if(amount > profileData.coins) return message.channel.send("You don't got that amount brah");
            await profileModel.findOneAndUpdate(
                {
                    userID: message.author.id,
                },
                {
                    $inc: {
                        coins: amount,
                        bank: -amount,
                    },
                });
                return message.channel.send(`You withdrawn ${amount} from your bank!`);
        }catch(err) {
            console.log(err);
        }
    }
}