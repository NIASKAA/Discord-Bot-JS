module.exports = {
    name: 'resume',
    description: 'Resume current song',
    execute(message) {
        const queueSong = message.client.queue.get(message.guild.id);
        if(!message.member.voice.channel) 
        return message.channel.send('You need to be in the voice channel brah..');
        if(!queueSong) 
        return message.channel.send('No song to resume brah');
        if(!queueSong.connection.dispatcher.paused) 
        return message.channel.send('Song already resuming');
        queueSong.connection.dispatcher.resume(); 
    },
};