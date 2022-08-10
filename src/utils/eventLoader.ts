import { Rythm } from "../struct/Client";
import { readdirSync } from "fs";
import { join } from "path";
import { logger } from "../logger";

// If in prod, use .js else .ts
const ENV_MODE_FILE_EXT: string =
    process.env.NODE_ENV === "production" ? ".js" : ".ts";

export const loadEvents = (client: Rythm) => {
    const eventsPath: string = join(__dirname, "../events");
    const eventFiles: string[] = readdirSync(eventsPath).filter((file) => file.endsWith(ENV_MODE_FILE_EXT));

    for (const file of eventFiles) {
        const filePath: string = join(eventsPath, file);
        const event: any = require(filePath);

        if (event.once) {
            client.once(event.name, (...args) => event.run(...args));
        }
        else {
            client.on(event.name, (...args) => event.run(...args));
        }

        logger.info(`[Events] ${event.name} event loaded!`);
    }
}