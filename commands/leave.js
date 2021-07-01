module.exports = {
    name: 'leave',
    description: 'stop the bot and have it leave the channel',
    async execute(message, args, cmd, client, Discord, profileData) {
        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel) return message.channel.send('You need to be in a voice channel bruh');
        await voiceChannel.leave();
        await message.channel.send('Cya nerd');
    }
}