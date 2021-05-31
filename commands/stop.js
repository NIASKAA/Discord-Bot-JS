
module.exports = {
    name: 'stop',
    description: 'Stop a song',
    execute(message) {
        const queueSong = message.client.queue.get(message.guild.id);
        if(!message.member.voice.channel)
        return message.channel.voice.send('You need to be the voice channel to stop the music...');
        if(!queueSong)
        return message.channel.send('No songs to stop brah');
        queueSong = [];
        queueSong.connection.dispatcher.end();
    }
}