import { Rythm } from "./struct/Client";

const client: Rythm = new Rythm();

// TODO: use top level await if we switch to ESM
void client
    .login(client.config.botSettings().token);