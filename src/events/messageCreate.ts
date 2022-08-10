import { Rythm } from "../struct/Client";
import { Message } from "discord.js";
import { logger } from "../logger";

module.exports = async (client: Rythm, message: Message) => {
    const prefix: string = client.prefix;
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args: string[] = message
        .content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
    const commandName: string | undefined = args.shift()?.toLowerCase();
    const command =
        client.commands.get(commandName!) ||
        client.commands.find(
            (cmd: { aliases: (string | undefined)[] }) =>
                cmd.aliases && cmd.aliases && cmd.aliases.includes(commandName)
        );
    if (!command) return;

    try {
        command.run(client, message, args);
    } catch (err: any | unknown) {
        logger.error(`Error executing command ${command.name}`, err.message);
    }
}