import { SlashCommandBuilder } from "discord.js";
import { setLogChannelCommand } from "../commands/set-mod-channel";
import { helpCommand } from "../commands/help";

const commands: SlashCommandBuilder[] = [setLogChannelCommand, helpCommand];

export default commands.map((c) => c.toJSON());
