import { getDiscordClient } from "../clients/discord";
import { GuildTextBasedChannel, EmbedBuilder } from "discord.js";
import { getModChannelID } from "../utils/mod-channel";

export async function handleVerdict(
  data: Record<string, string>
): Promise<void> {
  const verdict = Number(data.verdict ?? 0);

  const client = getDiscordClient();
  const channel = (await client.channels.fetch(
    data.channelID
  )) as GuildTextBasedChannel | null;
  if (!channel) return;

  const modID = await getModChannelID(data.guildID);
  if (!modID) return;
  const modChannel = (await client.channels.fetch(
    modID
  )) as GuildTextBasedChannel | null;
  if (!modChannel) return;

  switch (verdict) {
    case 0: {
      await modChannel.send({
        embeds: [
          buildEmbed(
            "✅ Content is safe",
            data.message,
            data.confidence,
            0x57f287        // green
          ),
        ],
      });
      break;
    }

    case 1: {
      // delete
      try {
        await channel.messages.delete(data.messageID);
      } catch (e) {
        console.error("Delete failed:", e);
      }

      await modChannel.send({
        embeds: [
          buildEmbed(
            "⛔ Deleted harmful content",
            data.message,
            data.confidence,
            0xed4245 // red
          ),
        ],
      });
      break;
    }

    case 2: {
      // warn
      await modChannel.send({
        embeds: [
          buildEmbed(
            `⚠️ Possible harmful content in https://discord.com/channels/${data.guildID}/${data.channelID}/${data.messageID}`,
            data.message,
            data.confidence,
            0xfee75c // yellow
          ),
        ],
      });
      break;
    }

    default:
      console.warn("Unknown verdict:", verdict);
  }
}

function buildEmbed(
  title: string,
  message: string,
  confidence: string,
  color: number
) {
  return new EmbedBuilder()
    .setColor(color)
    .setTitle(title)
    .addFields(
      { name: "Message", value: message.slice(0, 1024) || "No text" },
      { name: "Confidence", value: confidence }
    );
}
