import { Message, MessageEmbed } from "discord.js";

import { formatTimeRange } from "../utils/time";
import { servers } from "../data/server";

export default {
  name: ["nowplaying"],
  execute: (message: Message): void => {
    const server = servers[message.guild.id];
    if (server) {
      if (!server.playing) {
        message.channel.send("❌ Không tìm thấy gì trong danh để trình phát !");
      } else {
        const song = server.playing.song;
        const messageEmbed = new MessageEmbed()
          .setColor("#0099ff")
          .setTitle(song.resource.title)
          .setAuthor(`Trình phát 🎵 `)
          .setThumbnail(song.resource.thumbnail)
          .addFields(
            { name: "Kênh", value: song.resource.author, inline: true },
            {
              name: "Thời lượng",
              value: formatTimeRange(song.resource.length),
              inline: true,
            }
          )
        message.channel.send(messageEmbed);
      }
    } else {
      message.channel.send("❌ Không tìm thấy gì trong danh để trình phát !");
    }
  },
};
