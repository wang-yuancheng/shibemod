import { getRedisClient } from "../clients/redis";

export async function getModChannelID(guildID: string): Promise<string | null> {
  const redis = getRedisClient();
  return await redis.get(`modChannel:${guildID}`);
}

export async function getIgnoredChannelID(guildID: string): Promise<string | null> {
  const redis = getRedisClient();
  return await redis.get(`ignoreChannel:${guildID}`);
}
