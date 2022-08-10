import {
    Client,
    Collection,
    GatewayIntentBits,
    Partials
} from "discord.js";
import { ConfigManager } from "../managers/config";
import DisTube from "distube";
import { YtDlpPlugin } from "@distube/yt-dlp";

export class Rythm extends Client {
    commands = new Collection<string, any>();
    events = new Collection<string, any>();

    public readonly config: ConfigManager;
    public readonly prefix: string;
    public readonly distube: DisTube;

    public constructor() {
        super({
            partials: [
                Partials.User,
                Partials.Message,
                Partials.Channel,
                Partials.GuildMember,
                Partials.Reaction
            ],
            // Disable mentions by default
            allowedMentions: {
                parse: [],
                users: [],
                roles: [],
                repliedUser: false
            },
            intents: [
                // Privileged Intents
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessageTyping,
                GatewayIntentBits.MessageContent,

                // Regular Intents
                GatewayIntentBits.GuildEmojisAndStickers,
                GatewayIntentBits.GuildMessageReactions,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildVoiceStates
            ]
        });
        this.commands = new Collection();
        this.config = new ConfigManager(this);
        this.prefix = this.config.botSettings().prefix;
        this.distube = new DisTube(this, {
            leaveOnStop: false,
            emitNewSongOnly: true,
            emitAddSongWhenCreatingQueue: false,
            emitAddListWhenCreatingQueue: false,
            plugins: [
                new YtDlpPlugin(),
            ],
        });
    }
}