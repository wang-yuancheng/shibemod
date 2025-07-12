import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  MessageFlags,
} from "discord.js";
import { getRedisClient } from "../clients/redis";

const command = new SlashCommandBuilder()
  .setName("ignore")
  .setDescription("Ignore this channel when scanning messages")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

async function execute(inter: ChatInputCommandInteraction) {
  if (!inter.guild) {
    return await inter.reply({
      content: "Guild only",
      flags: MessageFlags.Ephemeral,
    });
  }

  const redis = getRedisClient();

  const key = `ignoreChannel:${inter.guild.id}`;
  const current = await redis.get(key);

  // If this channel is already ignored, remove the key 
  if (current === inter.channelId) {
    await redis.del(key);
    await inter.reply({ content: "🚫 Channel unignored", ephemeral: true });
    return;
  }

  // Otherwise, (re)-set the ignored channel to this one
  await redis.set(key, inter.channelId);
  await inter.reply({ content: "✅ Channel ignored", ephemeral: true });
}

export { command as ignoreChannelCommand, execute as ignoreChannelExecute };
