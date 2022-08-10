import { Rythm } from "../struct/Client";
import { logger } from "../logger";

module.exports = async (client: Rythm) => {
    logger.info(`${client.user?.username} is ready to play awesome music!`);

    try {
        await client.user?.setPresence({
            status: client.config.presenceSettings().status,
        });
    }
    catch (err: any | unknown) {
        logger.error(`Failed to set startup presence: ${err.message}`);
    }
}