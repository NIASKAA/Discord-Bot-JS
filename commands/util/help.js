const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'help',
    description: 'List of commands available',
    async execute(message, args, cmd, client, Discord, profileData) {
        let list1 =(`
        Basic Commands: \n
        !play \n
        !stop \n
        !skip \n
        !leave \n
        !price \n
        !news \n
        !jokes \n
        !roast \n
        !wey \n
        !poll \n`)

        let list2 =(`
        Economy Commands: \n
        !balance \n
        !daily \n
        !beg \n
        !withdraw \n
        !deposit \n
        !work \n
        !shop \n 
        !buy \n
        !bf (buy food) \n
        !armory \n
        !fish \n
        !rob \n
        !hunt \n
        !search \n
        !pay \n
        !fight \n
        `)

        list3 =(`
        RPG Commands \n
        !venture \n
        !goHome \n
        !eat \n
        `)

        let pages = [list1, list2, list3]
        let page = 1

        const Embed = new MessageEmbed()
        .setColor("RED")
        .setFooter(`Page: ${page} / ${pages.length}`)
        .setDescription(pages[page - 1])
        let msg = await message.channel.send(Embed)
        await msg.react("⬅️");
        await msg.react("➡️");

        if(pages.length === 1) return;


        const rightFilter = (reaction, user) => reaction.emoji.name === "➡️" && user.id === message.author.id;
        const leftFilter = (reaction, user) => reaction.emoji.name === "⬅️" && user.id === message.author.id;
        
        const right = msg.createReactionCollector(rightFilter, {time: 900000, dispose: true});
        const left = msg.createReactionCollector(leftFilter, {time: 900000, dispose: true});

        left.on("collect", erase => {
            erase.users.remove(message.author.id);
            if(page === 1) return;
            page--;
            Embed
            .setDescription(pages[page-1])
            .setFooter(`Page: ${page} / ${pages.length}`);
            msg.edit(Embed)
        })

        right.on("collect", erase => {
            erase.users.remove(message.author.id);
            if(page === pages.length) return;
            page++;
            Embed.setDescription(pages[page-1]).setFooter(`Page: ${page} / ${pages.length}`);
            msg.edit(Embed)
        })
    }
};