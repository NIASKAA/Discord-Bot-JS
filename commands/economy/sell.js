const profileModel = require('../../models/profileSchema')
const items = require('../../models/ores')
const {MessageEmbed} = require('discord.js')

module.exports = {
    name: 'sell',
    description: 'Sell an item',
    async execute(message, args, cmd, client, Discord, profileData) {
        const arg = args.join(" ")
        const arg1 = args.join(" ")
        if(!arg) return message.reply('Specify which item you want to sell brah');
        const itemToSell = arg;

        const validItem = !!items.find((val) => val.name === itemToSell);
        if(!validItem) return message.reply('The item is not valid');

        const itemPrice = items.find((val) => val.name === itemToSell).price;
        const itemImage = items.find((val) => val.name === itemToSell).image;

        Embed = new MessageEmbed()
        .setColor("PURPLE")
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL())
        .setTitle(`Sold ${itemToSell}!`)
        .setThumbnail(`${itemImage}`)

        if(profileData.inventory.find((x) => x === itemToSell) === undefined ) {
            return message.channel.send("You dont have this item mate")
        }
        addMoreCoins = {
            $add:[
                "$coins",itemPrice
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
                            "$$this", itemToSell
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

        message.channel.send(Embed)
    }
}
        
