import { Rythm } from "./struct/Client";
import { loadEvents } from "./utils/eventLoader";
import { loadCommands } from "./utils/commandLoader";

const client: Rythm = new Rythm();

// TODO: use top level await if we switch to ESM
void client
    .login(client.config.botSettings().token)
    .then(async () => {
        await loadEvents(client);
        await loadCommands(client);
    });