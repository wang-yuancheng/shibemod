import { EmbedBuilder } from "discord.js";

export function buildHelpEmbed(): EmbedBuilder {
  return new EmbedBuilder()
    .setTitle("Bot Help")
    .setDescription("Here are the available commands")
    .addFields(
      { name: "/help",          value: "Show this help message" },
      { name: "/activate",      value: "Activates bot and save current channel for alerts [Admin only]" },
    );
}
