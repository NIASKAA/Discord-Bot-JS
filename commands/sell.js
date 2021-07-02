const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'sell',
    description: 'Buy something from the shop',
    async execute(message, args, cmd, client, Discord, profileData) {
        const arg = args.join(" ")
        const itemToSell = arg;

        if(itemToSell === "borgor") {
            profileModel.findOne({ 
                userID: message.author.id,
            })

            twofewercoins = {
                $subtract:[
                    "$coins",10
                ]}
            onefewerborgor = { 
                $reduce : { 
                    input: "$inventory", 
            initialValue: {
                stilllooking:true, 
                i:[] 
            } , 
            in :{ $cond  :
                {  if: 
                    {$and : 
                        [{$eq : 
                            [
                                "$$this","borgor"
                        ]},
                            "$$value.stilllooking"
                        ]} , 
                          then: {stilllooking:false, i:"$$value.i"},
                          else : { stilllooking:"$$value.stilllooking", i: {$concatArrays:["$$value.i",["$$this"]]}}}}}}


            changes = [{$set : { coins: twofewercoins , inventory: onefewerborgor }},{$set: {inventory:"$inventory.i"}}]
            profileModel.updateOne({userID: message.author.id},changes)
        } else if(itemToSell === "fishing rod") {
            itemPrice = 90
            await profileModel.updateMany({
                userID: message.author.id
            },
            {
                $inc: {
                    coins: itemPrice,
                },
                $pull: {
                    inventory: itemToSell
                }
            },
            {
                upsert: true
            })
        } else if(itemToSell === "civic") {
            itemPrice = 15000
            await profileModel.updateMany({
                userID: message.author.id
            },
            {
                $inc: {
                    coins: itemPrice,
                },
                $pull: {
                    inventory: itemToSell
                }
            },
            {
                upsert: true
            })
        }
    
        message.reply(`You sold ${itemToSell}`)
    }
    
};