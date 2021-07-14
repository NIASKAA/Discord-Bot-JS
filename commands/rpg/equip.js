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
        } else if(itemToEquip === "Black Neos Helmet") {
            if(!profileData.inventory.includes("Black Neos Helmet")) return message.channel.send("You don't have that item!")
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
                                "$$this","Black Neos Helmet"
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
        } else if(itemToEquip === "Black Neos Armor") {
            if(!profileData.inventory.includes('Black Neos Armor')) return message.channel.send("You don't have that item!")
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
                                "$$this","Black Neos Armor"
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
        } else if(itemToEquip === "Black Neos Legs") {
            if(!profileData.inventory.includes('Black Neos Legs')) return message.channel.send("You don't have that item!")
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
                                "$$this","Black Neos Legs"
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
        } else if(itemToEquip === "Chaos Hat") {
            if(!profileData.inventory.includes('Chaos Hat')) return message.channel.send("You don't have that item!")
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
                                "$$this","Chaos Hat"
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
        } else if(itemToEquip === "Black Chaos Robe") {
            if(!profileData.inventory.includes('Black Chaos Robe')) return message.channel.send("You don't have that item!")
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
                                "$$this","Black Chaos Robe"
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
        } else if(itemToEquip === "Black Chaos Leggings") {
            if(!profileData.inventory.includes('Black Chaos Leggings')) return message.channel.send("You don't have that item!")
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
                                "$$this","Black Chaos Leggings"
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
        } else if(itemToEquip === "Dark Identity") {
            if(!profileData.inventory.includes('Dark Identity')) return message.channel.send("You don't have that item!")
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
                                "$$this","Dark Identity"
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
        } else if(itemToEquip === "Dark Katinas") {
            if(!profileData.inventory.includes('Dark Katinas')) return message.channel.send("You don't have that item!")
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
                                "$$this","Black Katinas"
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
        } else if(itemToEquip === "Dark Studded Pants") {
            if(!profileData.inventory.includes('Dark Studded Pants')) return message.channel.send("You don't have that item!")
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
                                "$$this","Black Neos Helmet"
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