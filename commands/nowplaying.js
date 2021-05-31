module.exports = {
    name: 'nowplaying',
    description: 'Get the name of the song playing',
    execute(message) {
        const queueSong = message.client.queue.get(message.guild.id);
        if(!queueSong) 
        return message.channel.send('There is nothing playing brah');
        return message.channel.send(`Now playing: ${queueSong.songs[0].title}`);    
    },
};