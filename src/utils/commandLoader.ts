import { Rythm } from "../struct/Client";
import { readdirSync } from "fs";
import { join } from "path";
import { logger } from "../logger";

// If in prod, use .js else .ts
const ENV_MODE_FILE_EXT: string =
    process.env.NODE_ENV === "production" ? ".js" : ".ts";

export const loadCommands = (client: Rythm) => {
    const commandsPath: string = join(__dirname, "../commands");
    const commandFiles: string[] = readdirSync(commandsPath).filter((file: string) => file.endsWith(ENV_MODE_FILE_EXT));

    for (const file of commandFiles) {
        const filePath: string = join(commandsPath, file);
        const command: any = require(filePath);

        if (command.default.trigger) {
            client.commands.set(command.default.trigger, command.default);
        }

        logger.info(`[Commands] ${command.default.trigger} command loaded!`);
    }
}