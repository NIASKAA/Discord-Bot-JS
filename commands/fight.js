const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'fight',
    cooldown: 2000,
    description: 'Square Up Bitch',
    async execute(message, args, cmd, client, Discord, profileData) {
        let user = message.mentions.users.first()
        if(!user) {
            return message.channel.send('You need to tell me who to pay at least bruh');
        }
        if(profileData.coins < 0) {
            return message.channel.send(`${user} is broke af and don't have anything left`)
        }
        script = [
            " shot the living hell out of ",
            " HADOKEN ",
            " stabbed ",
            " body the living shit out of ",
            " bombed ",
            " gave Corona virus to ",
            " food poison ",
            " called upon the power of Satan and shun the shit out of ",
            " called upon the power of Kayne West and had him preached about Lady Gaga to ",
            " did absolutely nothing somehow to ",
            " summoned Alan with his car and ran over ",
            " ever heard of one punched man? Well he showed up and punch the living shit out of "
        ]
        let itemList = ["borgor", "fishing rod", "gun", "off white t shirt"]


        const amount = Math.floor(Math.random() * 200) + 1;
        const randomItem = Math.floor(Math.random() * itemList.length)

        if(randomItem === "borgor") {
            addXP = {
                $add:[
                    "$xp",30
                ]}
            droppedItem = { 
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
                    xp: addXP,
                    inventory: droppedItem
                }
            },
            {
                $set: 
                {
                    inventory:"$inventory.i"
                }
            }]
            await profileModel.findOneAndUpdate({userID: user.id}, changes)
        } else if (randomItem === "fishing rod") {
            addXP = {
                $add:[
                    "$xp",30
                ]}
            droppedItem = { 
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
                    xp: addXP,
                    inventory: droppedItem
                }
            },
            {
                $set: 
                {
                    inventory:"$inventory.i"
                }
            }]
            await profileModel.findOneAndUpdate({userID: user.id}, changes)
        } else if(randomItem === "gun") {
            addXP = {
                $add:[
                    "$xp",30
                ]}
            droppedItem = { 
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
                                "$$this","gun"
                        ]},
                            "$$value.stilllooking"
                        ]} , 
                          then: {stilllooking:false, i:"$$value.i"},
                          else : { stilllooking:"$$value.stilllooking", i: {$concatArrays:["$$value.i",["$$this"]]}}}}}}


            changes = [{
                $set : 
                { 
                    xp: addXP,
                    inventory: droppedItem
                }
            },
            {
                $set: 
                {
                    inventory:"$inventory.i"
                }
            }]
            await profileModel.findOneAndUpdate({userID: user.id}, changes)
        } else if (randomItem === "off white t shirt") {
            addXP = {
                $add:[
                    "$xp",30
                ]}
            droppedItem = { 
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
                    xp: addXP,
                    inventory: droppedItem
                }
            },
            {
                $set: 
                {
                    inventory:"$inventory.i"
                }
            }]
            await profileModel.findOneAndUpdate({userID: user.id}, changes)
        }
        await profileModel.updateOne({
            userID: user.id
        },
        {
            $inc: {
                coins: -amount
            }
        })
        randomScript = Math.floor(Math.random() * script.length)
        message.channel.send(`You ${script[randomScript]} ${user}. ${user} dropped ${amount} and ${itemList[randomItem]}.`)
    }
}