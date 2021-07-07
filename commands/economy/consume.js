const profileModel = require('../../models/profileSchema');
const items = require('../../models/consumable');

module.exports = {
    name: 'eat',
    description: 'Replenish yourself young one',
    async execute(message, args, cmd, client, Discord, profileData) {
        const arg = args.join(" ")
        if(!arg) return message.reply('Tell me what to consume...');
        const itemToUse = arg;
        
        if(itemToUse === "borgor") {
            addHealth = {
                $add:[
                    "$healthP", 30,
                ]}
            addMana = {
                $add: [
                    "$manaP", 20
                ]
            }
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
                                "$$this","borgor"
                        ]},
                            "$$value.stilllooking"
                        ]} , 
                          then: {stilllooking:false, i:"$$value.i"},
                          else : { stilllooking:"$$value.stilllooking", i: {$concatArrays:["$$value.i",["$$this"]]}}}}}}

            changes = [{
                $set : 
                { 
                    healthP: addHealth,
                    manaP: addMana, 
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
        } else if (itemToUse === "ramen") {
            addHealth = {
                $add:[
                    "$healthP", 60,
                ]}
            addMana = {
                $add: [
                    "$manaP", 50,
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
                                "$$this","ramen"
                        ]},
                            "$$value.stilllooking"
                        ]} , 
                          then: {stilllooking:false, i:"$$value.i"},
                          else : { stilllooking:"$$value.stilllooking", i: {$concatArrays:["$$value.i",["$$this"]]}}}}}}

            changes = [{
                $set : 
                {   
                    healthP: addHealth,
                    manaP: addMana,
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
        } else if(itemToUse === "health potion") {
            addHealth = {
                $add:[
                    "$healthP", 50,
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
                                "$$this","health potion"
                        ]},
                            "$$value.stilllooking"
                        ]} , 
                          then: {stilllooking:false, i:"$$value.i"},
                          else : { stilllooking:"$$value.stilllooking", i: {$concatArrays:["$$value.i",["$$this"]]}}}}}}

            changes = [{
                $set : 
                {   
                    healthP: addHealth,
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
        } else if (itemToUse === "medium health potion") {
            addHealth = {
                $add:[
                    "$healthP", 80,
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
                                "$$this","medium health potion"
                        ]},
                            "$$value.stilllooking"
                        ]} , 
                          then: {stilllooking:false, i:"$$value.i"},
                          else : { stilllooking:"$$value.stilllooking", i: {$concatArrays:["$$value.i",["$$this"]]}}}}}}

            changes = [{
                $set : 
                {   
                    healthP: addHealth,
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
        } else if (itemToUse === "mana potion") {
            addMana = {
                $add:[
                    "$manaP", 50,
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
                                "$$this","mana potion"
                        ]},
                            "$$value.stilllooking"
                        ]} , 
                          then: {stilllooking:false, i:"$$value.i"},
                          else : { stilllooking:"$$value.stilllooking", i: {$concatArrays:["$$value.i",["$$this"]]}}}}}}

            changes = [{
                $set : 
                {   
                    manaP: addMana,
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
        } else if (itemToUse === "medium mana potion") {
            addMana = {
                $add:[
                    "$manaP", 80,
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
                                "$$this","medium mana potion"
                        ]},
                            "$$value.stilllooking"
                        ]} , 
                          then: {stilllooking:false, i:"$$value.i"},
                          else : { stilllooking:"$$value.stilllooking", i: {$concatArrays:["$$value.i",["$$this"]]}}}}}}

            changes = [{
                $set : 
                {   
                    manaP: addMana,
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
            message.reply(`You used a ${itemToUse}!`)
    }
};