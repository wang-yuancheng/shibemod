import { SlashCommandBuilder } from "discord.js";
import { setLogChannelCommand } from "../commands/set-mod-channel";
import { helpCommand } from "../commands/help";
import { ignoreChannelCommand } from "../commands/ignore-channel";

const commands: SlashCommandBuilder[] = [
  setLogChannelCommand,
  helpCommand,
  ignoreChannelCommand,
];

export default commands.map((c) => c.toJSON());
