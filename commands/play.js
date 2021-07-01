const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['skip', 'stop'],
    description: 'Cool beats bro',
    async execute(message, args, cmd, client, Discord) {
        const voiceChannel = message.member.voice.channel;
        if(!voiceChannel) return message.channel.send('You need to be in a voice channel bro');
        const serverQueue = queue.get(message.guild.id);

        if(cmd === 'play') {
            if(!args.length) return message.channel.send('You need to send the second syntax brah');
            let song = {};

            if(ytdl.validateURL(args[0])) {
                const songInfo = await ytdl.getInfo(args[0]);
                song = {title: songInfo.videoDetails.title, url: songInfo.videoDetails.video_url}
            } else {
                const videoFind = async (query) => {
                    const videoResult = await ytSearch(query);
                    return (videoResult.videos.length > 1) ? videoResult.video[0] : null;
                }

                const video = await videoFind(args.join(' '));
                if(video) {
                    song = {title: video.title, url: video.url}
                } else {
                    message.channel.send('Error finding video...');
                }
            }

            if(!serverQueue) {
                const queueConstructor = {
                    voiceChannel: voiceChannel,
                    textChannel: message.channel,
                    connection: null,
                    songs: []
                }
    
                queue.set(message.guild.id, queueConstructor);
                queueConstructor.songs.push(song);
                
                try {
                    const connection = await voiceChannel.join();
                    queueConstructor.connection = connection;
                    videoPlayer(message.guild, queueConstructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('There was an error...');
                    throw err;
                }
            } else {
                serverQueue.songs.push(song);
                return message.channel.send(`${song.title} added to queue!`);
            }
        } 
        else if(cmd === 'skip') skipSong(message, serverQueue);
        else if(cmd == 'stop') stopSong(message, serverQueue);
    }
}

const videoPlayer = async (guild, song) => {
    const songQueue = queue.get(guild.id);
    
    if(!song) {
        songQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    } 
    const stream = ytdl(song.url, {filter: 'audioonly'});
    songQueue.connection.play(stream, {seek: 0, volume: 0.5})
    .on('finish', () => {
        songQueue.songs.shift();
        videoPlayer(guild, soneQueue.songs[0]);
    });

    await songQueue.textChannel.send(`Now playing ${song.title}`);
}

const skipSong = (message, serverQueue) => {
    if(!message.member.voice.channel) return message.channel.send('You need to be a voice channel brah');
    if(!serverQueue) {
        return message.channel.send('There are no songs in queue');
    }

    serverQueue.connection.dispatcher.end();
}

const stopSong = (message, serverQueue) => {
    if(!message.member.voice.channel) return message.channel.send('You need to be a voice channel brah');
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
}