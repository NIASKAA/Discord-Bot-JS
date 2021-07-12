const profileModel = require('../../models/profileSchema');
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'craft',
    description: 'craft new items',
    async execute(message, args, cmd, client, Discord, profileData) {
        const arg = args.join(" ")
        const itemToCraft = arg;
        if(!itemToCraft) return message.reply("At least tell me what to craft...")
        if(itemToCraft === "power amulet") {
            itemImage = 'https://imgur.com/SFTM0cR.png'
            if(!profileData.inventory.includes('power jewel' || 'iron' || 'platinum')) {
                return message.channel.send("You don't have enough materials!") 
            }
            firstItem = { 
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
                inventory: firstItem 
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
            },changes)
        secondItem = { 
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
                            "$$this","platinum"
                    ]},
                        "$$value.stilllooking"
                    ]} , 
                        then: {stilllooking:false, i:"$$value.i"},
                        else : { stilllooking:"$$value.stilllooking", i: {$concatArrays:["$$value.i",["$$this"]]}}}}}}
        changes = [{
            $set : 
            {   
                inventory: secondItem 
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
            },changes)
        thirdItem = { 
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
                            "$$this","power jewel"
                    ]},
                        "$$value.stilllooking"
                    ]} , 
                        then: {stilllooking:false, i:"$$value.i"},
                        else : { stilllooking:"$$value.stilllooking", i: {$concatArrays:["$$value.i",["$$this"]]}}}}}}
        changes = [{
            $set : 
            {   
                inventory: thirdItem 
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
            },changes)
        await profileModel.updateOne({
            userID: message.author.id
        },
        {
            $push: {
                inventory: 'power amulet'
            }
        })
            message.channel.send(Embed)

        } else if(itemToCraft === 'magic amulet') {
            itemImage = "https://imgur.com/pIJmaCg.png"
            if(!profileData.inventory.includes('magic jewel' || 'iron' || 'platinum')) {
                return message.channel.send("You don't have enough materials!") 
            }
            firstItem = { 
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
                inventory: firstItem 
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
            },changes)
        secondItem = { 
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
                            "$$this","platinum"
                    ]},
                        "$$value.stilllooking"
                    ]} , 
                        then: {stilllooking:false, i:"$$value.i"},
                        else : { stilllooking:"$$value.stilllooking", i: {$concatArrays:["$$value.i",["$$this"]]}}}}}}
        changes = [{
            $set : 
            {   
                inventory: secondItem 
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
            },changes)
        thirdItem = { 
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
                            "$$this","magic jewel"
                    ]},
                        "$$value.stilllooking"
                    ]} , 
                        then: {stilllooking:false, i:"$$value.i"},
                        else : { stilllooking:"$$value.stilllooking", i: {$concatArrays:["$$value.i",["$$this"]]}}}}}}
        changes = [{
            $set : 
            {   
                inventory: thirdItem 
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
            },changes)
        await profileModel.updateOne({
            userID: message.author.id
        },
        {
            $push: {
                inventory: 'power amulet'
            }
        })
        Embed = new MessageEmbed()
        .setColor('BLUE')
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .setTitle(`${message.author.username} crafted ${itemToCraft}!`)
        .setThumbnail(`${itemImage}`)
        message.channel.send(Embed)
        }
        }
}