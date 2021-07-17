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
        } else if(itemToEquip === "black neos helmet") {
            if(!profileData.inventory.includes("black neos helmet")) return message.channel.send("You don't have that item!")
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
                                "$$this","black neos helmet"
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
                    "equip.0.helmet": itemToEquip
                },
                $inc: {
                    defense: 1.4
                }
            })
        } else if(itemToEquip === "black neos armor") {
            if(!profileData.inventory.includes('black neos armor')) return message.channel.send("You don't have that item!")
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
                                "$$this","black neos armor"
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
                    "equip.0.armor": itemToEquip
                },
                $inc: {
                    defense: 1.4
                }
            })
        } else if(itemToEquip === "black neos legs") {
            if(!profileData.inventory.includes('black neos legs')) return message.channel.send("You don't have that item!")
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
                                "$$this","black neos legs"
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
                    "equip.0.leg": itemToEquip
                },
                $inc: {
                    defense: 1.4
                }
            })
        } else if(itemToEquip === "chaos hat") {
            if(!profileData.inventory.includes('chaos hat')) return message.channel.send("You don't have that item!")
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
                                "$$this","chaos hat"
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
                    "equip.0.helmet": itemToEquip
                },
                $inc: {
                    defense: 1.1
                }
            })
        } else if(itemToEquip === "black chaos robe") {
            if(!profileData.inventory.includes('black chaos robe')) return message.channel.send("You don't have that item!")
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
                                "$$this","black chaos robe"
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
                    "equip.0.armor": itemToEquip
                },
                $inc: {
                    defense: 1.1
                }
            }) 
        } else if(itemToEquip === "black chaos leggings") {
            if(!profileData.inventory.includes('black chaos leggings')) return message.channel.send("You don't have that item!")
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
                                "$$this","black chaos leggings"
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
                    "equip.0.leg": itemToEquip
                },
                $inc: {
                    defense: 1.1
                }
            })
        } else if(itemToEquip === "dark identity") {
            if(!profileData.inventory.includes('dark identity')) return message.channel.send("You don't have that item!")
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
                                "$$this","dark identity"
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
                    "equip.0.helmet": itemToEquip
                },
                $inc: {
                    defense: 1.2
                }
            })
        } else if(itemToEquip === "dark katinas") {
            if(!profileData.inventory.includes('dark katinas')) return message.channel.send("You don't have that item!")
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
                                "$$this","black katinas"
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
                    "equip.0.armor": itemToEquip
                },
                $inc: {
                    defense: 1.2
                }
            })
        } else if(itemToEquip === "dark studded pants") {
            if(!profileData.inventory.includes('dark studded pants')) return message.channel.send("You don't have that item!")
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
                                "$$this","dark studded pants"
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
                    "equip.0.leg": itemToEquip
                },
                $inc: {
                    defense: 1.2
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