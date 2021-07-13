const profileModel = require('../../models/profileSchema');
const {MessageEmbed} = require('discord.js');

module.exports = {
    name: 'equip',
    description: 'equip gear',
    async execute(message, args, cmd, client, Discord, profileData) {
        const arg = args.join(" ")
        const itemToEquip = arg;
        if(!itemToEquip) return message.reply("Invalid item to equip")
       
        if(itemToEquip === "power amulet") {
            if(!profileData.inventory.includes('power amulet')) return message.channel.send("You don't have that item!")
            item = { 
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
                                "$$this","power amulet"
                        ]},
                            "$$value.stilllooking"
                        ]} , 
                          then: {stilllooking:false, i:"$$value.i"},
                          else : { stilllooking:"$$value.stilllooking", i: {$concatArrays:["$$value.i",["$$this"]]}}}}}}
        changes = [{
            $set : 
            {   
                inventory: item 
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
            addItem = profileModel.findOne({userID: message.author.id})
            await profileModel.findOneAndUpdate({
                userID: message.author.id
            },
            {
                "$set": {
                    "equip.0.aces": itemToEquip
                },
                $inc: {
                    damage: 3
                }
            })
        } else if (itemToEquip === "magic amulet") {
            if(!profileData.inventory.includes('magic amulet')) return message.channel.send("You don't have that item!")
            item = { 
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
                                "$$this","magic amulet"
                        ]},
                            "$$value.stilllooking"
                        ]} , 
                          then: {stilllooking:false, i:"$$value.i"},
                          else : { stilllooking:"$$value.stilllooking", i: {$concatArrays:["$$value.i",["$$this"]]}}}}}}
            changes = [{
                $set : 
                {   
                    inventory: item 
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
            await profileModel.findOneAndUpdate({
                userID: message.author.id
            },
            {
                "$set": {
                    "equip.0.aces": itemToEquip
                },
                $inc: {
                    mDamage: 3
                }
            })
        }
        Embed = new MessageEmbed()
        .setColor("GREEN")
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .setTitle(`${message.author.username} equipped ${itemToEquip}`)
        message.channel.send(Embed)
    }
}