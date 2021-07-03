const axios = require('axios');
require("./inline.js");

const chatSend = async (message) => {
    try {
        let bit = process.env.bid
        let key = process.env.key
        let uid = "1"
        let msg = message.content
            message.channel.startTyping()
            await axios.get(``)
            .then(res => {
                let data = res.data;
                let reply = data.cnt 
                console.log(reply)
                if(reply) {
                    message.chatSend.stopTyping();
                    message.sendInline(reply, 
                        {allowMentions: 
                            {repliedUser: false}
                        }
                    );
                } else if(!reply) {
                    message.channel.stopTyping();
                    message.sendInline("Bot is broken", {allowMentions: {repliedUser: false}});
                }
            })
    } catch (err) {
        message.channel.stopTyping();
        console.log(err)
    }
}

module.exports = { chatSend };