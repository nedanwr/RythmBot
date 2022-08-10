import { Rythm } from "../struct/Client";
import type { Message } from "discord.js";
import { Queue } from "distube";

export default {
    trigger: "volume",
    aliases: ["vol", "v"],

    /**
     * @param {Rythm} client
     * @param {Message} msg
     * @param args: string[]
     */
    async run(client: Rythm, msg: Message, args: string[]) {
        const { channel } = msg;

        const queue: Queue | undefined = client.distube.getQueue(msg);
        if (!queue) return channel.sendTyping().then(() => channel.send("No music is playing."));

        const volume: number = parseInt(args[0]);
        if (isNaN(volume)) return channel.sendTyping().then(() => channel.send("Invalid volume."));
        if (volume < 0 || volume > client.config.musicSettings().maxVolume) return channel.sendTyping().then(() => channel.send("Volume must be between 0 and 100."));

        queue.setVolume(volume);
        return channel.sendTyping().then(() => channel.send(`:white_check_mark: Volume set to ${volume}%`));
    }
}