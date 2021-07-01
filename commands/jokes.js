module.exports = {
    name: 'jokes',
    description: "Tell a joke",
    async execute(message, args, cmd, client, Discord) {
        const badjokes = [
            "Why did the chicken cross the road? Because it was disabled",
            "I want to fucking kill myself.. That's funny right?",
            "IS THAT A SUPRA?",
            "Is that a transformer?",
            "WHAT DO YOU MEANNNN THO?",
            "Stop. Get some help.",
            "Error. System reboot. Sike, fuck you.",
            "What do you call an alligator that wants to be a detective? An investigator. ACK ACK ACK",
            "HAMBURGER PLS",
        ];
        message.channel.send(badjokes[Math.floor(Math.random() * badjokes.length)]);
    }
}