import { Rythm } from "../struct/Client";
import type { Message, VoiceBasedChannel, TextChannel } from "discord.js";

export default {
    trigger: "play",
    aliases: ["p"],

    /**
     * @param {Rythm} client
     * @param {Message} msg
     * @param args: string[]
     */
    async run(client: Rythm, msg: Message, args: string[]) {
        const { member, channel } = msg;
        const voiceChannel: VoiceBasedChannel | null | undefined = member?.voice.channel;

        if (!voiceChannel) {
            return channel.sendTyping().then(() => channel.send("You need to be in a voice channel to use this command."));
        }

        if (!args.length) {
            return channel.sendTyping().then(() => channel.send("Please enter a song url or search query."));
        }

        await client.distube.play(voiceChannel, args.join(" "), {
            member: member!,
            textChannel: msg.channel as TextChannel,
            message: msg,
        });
    }
}