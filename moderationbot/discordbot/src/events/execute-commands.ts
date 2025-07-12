import { MessageFlags } from "discord.js";
import { getDiscordClient } from "../clients/discord";
import { setLogChannelExecute } from "../commands/set-mod-channel";
import { helpExecute } from "../commands/help";
import { ignoreChannelExecute } from "../commands/ignore-channel";

export function startInteractionListener(): void {
  const client = getDiscordClient();

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    try {
      switch (interaction.commandName) {
        case "activate":
          await setLogChannelExecute(interaction);
          break;
        case "help":
          await helpExecute(interaction);
          break;
        case "ignore":
          await ignoreChannelExecute(interaction);
          break;
        default:
          await interaction.reply({
            content: "Unknown command",
            flags: MessageFlags.Ephemeral,
          });
      }
    } catch (err) {
      console.error(err);
      if (!interaction.replied) {
        await interaction.reply({
          content: "⚠️ Error executing command",
          flags: MessageFlags.Ephemeral,
        });
      }
    }
  });
}
