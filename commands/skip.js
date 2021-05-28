const ytdl = require('ytdl-core');

module.exports = {
    name: 'skip',
    description: 'Skip a song',
    execute(message) {
        const queueSong = message.client.queue.get(message.guild.id);
        if(!message.member.voice.channel)
        return message.channel.send("You need to be the voice channel to stop the music...");
        if(!queueSong)
        return message.channel.send("No song to skip brah");
        queueSong.connection.dispatcher.end();
    },
};