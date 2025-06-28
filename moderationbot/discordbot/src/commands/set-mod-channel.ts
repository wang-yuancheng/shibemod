import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
  MessageFlags
} from "discord.js";
import { getRedisClient } from "../clients/redis";

const command = new SlashCommandBuilder()
  .setName("activate")                      
  .setDescription("Save this channel for moderation alerts")
  .setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

async function execute(inter: ChatInputCommandInteraction) {
  if (!inter.guild) {
    return await inter.reply({ content: "Guild only", flags: MessageFlags.Ephemeral, });
  }

  const redis = getRedisClient();
  await redis.set(`modChannel:${inter.guild.id}`, inter.channelId);

  await inter.reply({ content: "✅ Log channel saved", ephemeral: true });
}

export { command as setLogChannelCommand, execute as setLogChannelExecute };
