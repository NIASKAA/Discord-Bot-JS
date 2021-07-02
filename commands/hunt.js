const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'hunt',
    cooldown: 3000,
    description: 'Hunt in the wild',
    async execute(message, args, cmd, client, Discord, profileData) {
        const animals = [
            "🐰 `(Rabbit)`",
            "🐸 `(Frog)`",
            "🐒 `(Monkey)`",
            "🐔 `(Chicken)`",
            "🐤 `(Baby Chick)`",
            "🐺 `(Wolf)`",
            "🐓 `(Rooster)`",
            "🦃 `(Turkey)`", 
            "🐿 `(Chipmunk)`",
            "🐃 `(Water Buffalo)`",
            "🐂 `(Ox)`",
            "🐎 `(Race Horse)`",
            "🐖 `(Pig)`",
            "🐍 `(Snake)`",
            "🐄 `(Cow)`",
            "🐉 `(Dragon)`",
            "🐊 `(Crocodile)`",
            "🐗 `(Boar)`",
            "🦌 `(Deer)`",
            "🦁 `(Lion)`",
            "🦄 `(Unicorn)`"
        ]
        const randomAnimal = Math.floor((Math.random() * animals.length));
        const animalPrice = Math.floor((Math.random() * 500) + 1);
        params = {
            userID: message.author.id,
            serverID:  message.guild.id
        }
        if(!profileData.inventory === "gun") {
            return message.reply('How in the hell are you going to hunt without a gun? ')
        } else if(profileData.inventory === "gun") {
            profileModel.findOne(params, async(err, data) => {
                if(data) {
                    const getAnimals = Object.keys(data.inventory).includes(randomAnimal);
                    if(!getAnimals) {
                        data.inventory[randomAnimal] = 1;
                    } else {
                        data.inventory[randomAnimal]++;
                    }
                    await profileModel.findOneAndUpdate({
                        userID: message.author.id,
                    },
                    {
                        $inc: {
                            coins: animalPrice,
                        }
                    }, data);
                    message.reply(`You hunt a ${animals[randomAnimal]} and got ${animalPrice}`);
                }
            })
        }
    }
}