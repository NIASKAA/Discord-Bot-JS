const { execute } = require("./play");

module.exports = {
    name: 'leave',
    description: 'Stop the bot and leave channel',
    async execute(message, args) {
        const voiceChannel = message.member.voice.voiceChannel;
        if(!voiceChannel) return message.channel.send('You need to be a voice channel to stop the music brah');
        await voiceChannel.leave();
        await message.channel.send('Now leaving channel.')
    }
}