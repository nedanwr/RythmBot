import type { PresenceStatusData } from "discord.js";
import { Manager } from ".";
const config = require("../../config.json");

interface BotSettings {
    token: string;
    prefix: string;
}

interface PresenceSettings {
    status: PresenceStatusData | undefined;
    message: PresenceStatusData | undefined;
    type: PresenceStatusData | undefined;
}

interface MusicSettings {
    maxVolume: number;
}

export class ConfigManager extends Manager {
    botSettings = (): BotSettings => ({
        token: config.token,
        prefix: config.prefix,
    });

    presenceSettings = (): PresenceSettings => ({
        status: config.presence.status,
        message: config.presence.activity.message,
        type: config.presence.activity.type,
    });

    musicSettings = (): MusicSettings => ({
        maxVolume: config.music.max_volume,
    })
}