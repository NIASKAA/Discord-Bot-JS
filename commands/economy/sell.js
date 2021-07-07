const profileModel = require('../../models/profileSchema');
const items = require('../../models/shopItems');

module.exports = {
    name: 'sell',
    description: 'Sell an item',
    async execute(message, args, cmd, client, Discord, profileData) {
        const arg = args.join(" ")
        const itemToSell = arg;
        if(!itemToSell) return message.reply("At least tell me what to sell...")
        

        if(itemToSell === "borgor") {
            if(profileData.inventory.find((x) => x.toLowerCase() === "borgor") === undefined ) {
                return message.channel.send("You dont have this item mate")
            }
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
            if(profileData.inventory.find((x) => x.toLowerCase() === "fishing rod") === undefined ) {
                return message.channel.send("You dont have this item mate")
            }
            addMoreCoins = {
                $add:[
                    "$coins",100
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
        } else if (itemToSell === "off white t shirt") {
            if(profileData.inventory.find((x) => x.toLowerCase() === "off white t shirt") === undefined ) {
                return message.channel.send("You dont have this item mate")
            }
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
            if(profileData.inventory.find((x) => x.toLowerCase() === "civic") === undefined ) {
                return message.channel.send("You dont have this item mate")
            }
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
        } else if (itemToSell === "civic type r") {
            if(profileData.inventory.find((x) => x.toLowerCase() === "civic type r") === undefined ) {
                return message.channel.send("You dont have this item mate")
            }
            addMoreCoins = {
                $add:[
                    "$coins",40000
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
                                "$$this","civic type r"
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
        } else if (itemToSell === "diamond") {
            if(profileData.inventory.find((x) => x.toLowerCase() === "diamond") === undefined ) {
                return message.channel.send("You dont have this item mate")
            }
            addMoreCoins = {
                $add:[
                    "$coins", 1200
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
                                "$$this","diamond"
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
        } else if (itemToSell === "iron") {
            if(profileData.inventory.find((x) => x.toLowerCase() === "iron") === undefined ) {
                return message.channel.send("You dont have this item mate")
            }
            addMoreCoins = {
                $add:[
                    "$coins",150
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
                                "$$this","iron"
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
        } else if (itemToSell === "copper") {
            if(profileData.inventory.find((x) => x.toLowerCase() === "copper") === undefined ) {
                return message.channel.send("You dont have this item mate")
            }
            addMoreCoins = {
                $add:[
                    "$coins",100
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
                                "$$this","copper"
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
        } else if (itemToSell === "gold") {
            if(profileData.inventory.find((x) => x.toLowerCase() === "gold") === undefined ) {
                return message.channel.send("You dont have this item mate")
            }
            addMoreCoins = {
                $add:[
                    "$coins",600
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
                                "$$this","gold"
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
        } else if (itemToSell === "ruby") {
            if(profileData.inventory.find((x) => x.toLowerCase() === "ruby") === undefined ) {
                return message.channel.send("You dont have this item mate")
            }
            addMoreCoins = {
                $add:[
                    "$coins",500
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
                                "$$this","ruby"
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
        } else if (itemToSell === "sapphire") {
            if(profileData.inventory.find((x) => x.toLowerCase() === "sapphire") === undefined ) {
                return message.channel.send("You dont have this item mate")
            }
            addMoreCoins = {
                $add:[
                    "$coins",500
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
                                "$$this","sapphire"
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
        } else if (itemToSell === "amethyst") {
            if(profileData.inventory.find((x) => x.toLowerCase() === "amethyst") === undefined ) {
                return message.channel.send("You dont have this item mate")
            }
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
                                "$$this","amethyst"
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
        } else if (itemToSell === "emerald") {
            if(profileData.inventory.find((x) => x.toLowerCase() === "emerald") === undefined ) {
                return message.channel.send("You dont have this item mate")
            }
            addMoreCoins = {
                $add:[
                    "$coins",1600
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
                                "$$this","emerald"
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