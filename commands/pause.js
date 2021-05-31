module.exports = {
    name: 'pause',
    description: 'Pause a song',
    execute(message) {
        const queueSong = message.client.queue.get(message.guild.id);
        if(!message.member.voice.channel) 
        return message.channel.send('You need to be a voice channel to pause music brah...');
        if(!queueSong) 
        return message.channel.send('There is nothing to pause brah');
        if(queueSong.connection.dispatcher.paused) 
        return message.channel.send('Song already paused brah');
        queueSong.connection.dispatcher.pause();
    },
};