const profileModel = require('../models/profileSchema');
const items = require('../models/shopItems');

module.exports = {
    name: 'sell',
    description: 'Sell an item',
    async execute(message, args, cmd, client, Discord, profileData) {
        const arg = args.join(" ")
        const itemToSell = arg;
        if(!itemToSell) return message.reply("At least tell me what to sell...")
        if(itemToSell === "borgor") {
            addMoreCoins = {
                $add:[
                    "$coins",10
                ]}
            onefewerborgor = { 
                $reduce : { 
                    input: "$inventory", 
            initialValue: {
                stilllooking:true, 
                i:[] 
            } , 
            in :{ 
                $cond  :
                { if: 
                    {$and : 
                        [{
                            $eq : 
                            [
                                "$$this","borgor"
                        ]},
                            "$$value.stilllooking"
                        ]} , 
                          then: {stilllooking:false, i:"$$value.i"},
                          else : { stilllooking:"$$value.stilllooking", i: {$concatArrays:["$$value.i",["$$this"]]}}}}}}


            changes = [{
                $set : 
                { 
                    coins: addMoreCoins, 
                    inventory: onefewerborgor 
                }
            },
            {
                $set: 
                {
                    inventory:"$inventory.i"
                }
            }]
            await profileModel.findOneAndUpdate({
                userID: message.author.id
            }, changes)
        } else if(itemToSell === "fishing rod") {
            addMoreCoins = {
                $add:[
                    "$coins",100
                ]}
            onefewerbfishingrod = { 
                $reduce : { 
                    input: "$inventory", 
            initialValue: {
                stilllooking:true, 
                i:[] 
            } , 
            in :{ 
                $cond  :
                { if: 
                    {$and : 
                        [{
                            $eq : 
                            [
                                "$$this","fishing rod"
                        ]},
                            "$$value.stilllooking"
                        ]} , 
                          then: {stilllooking:false, i:"$$value.i"},
                          else : { stilllooking:"$$value.stilllooking", i: {$concatArrays:["$$value.i",["$$this"]]}}}}}}


            changes = [{
                $set : 
                { 
                    coins: addMoreCoins, 
                    inventory: onefewerfishingRod
                }
            },
            {
                $set: 
                {
                    inventory:"$inventory.i"
                }
            }]
            await profileModel.findOneAndUpdate({
                userID: message.author.id
            }, changes)
        } else if (itemToSell === "off white t shirt") {
            addMoreCoins = {
                $add:[
                    "$coins",400
                ]}
            onefewerItem = { 
                $reduce : { 
                    input: "$inventory", 
            initialValue: {
                stilllooking:true, 
                i:[] 
            } , 
            in :{ 
                $cond  :
                { if: 
                    {$and : 
                        [{
                            $eq : 
                            [
                                "$$this","off white t shirt"
                        ]},
                            "$$value.stilllooking"
                        ]} , 
                          then: {stilllooking:false, i:"$$value.i"},
                          else : { stilllooking:"$$value.stilllooking", i: {$concatArrays:["$$value.i",["$$this"]]}}}}}}


            changes = [{
                $set : 
                { 
                    coins: addMoreCoins, 
                    inventory: onefewerItem 
                }
            },
            {
                $set: 
                {
                    inventory:"$inventory.i"
                }
            }]
            await profileModel.findOneAndUpdate({
                userID: message.author.id
            }, changes)
        } else if (itemToSell === "civic") {
            addMoreCoins = {
                $add:[
                    "$coins",15000
                ]}
            onefewerItem = { 
                $reduce : { 
                    input: "$inventory", 
            initialValue: {
                stilllooking:true, 
                i:[] 
            } , 
            in :{ 
                $cond  :
                { if: 
                    {$and : 
                        [{
                            $eq : 
                            [
                                "$$this","civic"
                        ]},
                            "$$value.stilllooking"
                        ]} , 
                          then: {stilllooking:false, i:"$$value.i"},
                          else : { stilllooking:"$$value.stilllooking", i: {$concatArrays:["$$value.i",["$$this"]]}}}}}}


            changes = [{
                $set : 
                { 
                    coins: addMoreCoins, 
                    inventory: onefewerItem 
                }
            },
            {
                $set: 
                {
                    inventory:"$inventory.i"
                }
            }]
            await profileModel.findOneAndUpdate({
                userID: message.author.id
            }, changes)
        }
        message.reply(`You sold ${itemToSell}`)
    }
}