const ytdl = require('ytdl-core');

module.exports = {
    name: 'play',
    description: 'Play a song',
    async execute(message) {
        try{
            const args = message.content.split(" ");
            const queue = message.client.queue;
            const queueSong = message.client.queue.get(message.guild.id);

            const voiceChannel = message.member.voice.channel;
            if(!voiceChannel)
            return message.channel.send('You need to be in a voice channel to play music dood...');

            const permissions = voiceChannel.permissionsFor(message.client.user);

            if(!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
            return message.channel.send('You need to be give me permissions to get in the voice channel dood...');
            }
            const songInfo = await ytdl.getInfo(args[1]);
            const song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
            };

            if(!queueSong) {
                const createQueue = {
                    textChannel: message.channel,
                    voiceChannel: voiceChannel,
                    connection: null,
                    songs: [],
                    volume: 5,
                    playing: true,
                };
            
                queue.set(message.guild.id, createQueue);
                createQueue.songs.push(song);
            
                try{
                    let connection = await voiceChannel.join();
                    createQueue.connection = connection;
                    play(message.guild, createQueue.songs[0]);
                } catch (err) {
                    console.log(err);
                    queue.delete(message.guild.id);
                    return message.channel.send(err);
                } 
            } else {
                queueSong.songs.push(song);
                return message.channel.send(`{song.title} been added to the queue!`);
            }            
        }catch(error) {
            console.log(error);
            message.channel.send(error.message);
        }
    },

    play(message, queueSong) {
        const queue = message.client.queue;
        const guild = message.guild;
        const queueSong = queue.get(message.guild.id);

        if(!song) {
            queueSong.voiceChannel.leave();
            queue.delete(guild.id);
            return;
        }

        const dispatcher = queueSong.connection
    }
}


