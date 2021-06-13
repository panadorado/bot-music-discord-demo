import { Message, VoiceConnection, MessageEmbed } from "discord.js";
import ytdl from "ytdl-core";

import { servers } from "../data/server";
import { getVideoDetails, getPlaylist } from "../services/youtube";
import { formatTimeRange } from "../utils/time";
import { youtubePlaylistRegex } from "../constant/regex";

// Đảm nhiệm stream nhạc và chuyển bài khi kết thúc
const play = (connection: VoiceConnection, message: Message) => {
  const server = servers[message.guild.id];
  const song = server.queue[0];
  server.playing = {
    song,
    startedAt: new Date().getTime(),
  };

  server.dispatcher = connection.play(
    ytdl(song.resource.url, { filter: "audioonly" })
  );
  server.queue.shift();
  // Phát hiện việc bài hát kết thúc
  server.dispatcher.on("finish", () => {
    if (server.queue[0]) play(connection, message);
    else {
      server.playing = null;
      server.queue = [];
      connection.disconnect();
    }
  });
};

export default {
  name: "play",
  execute: (message: Message, content: string): void => {
    if (!content)
      message.channel.send(
        "❌ Bạn cần cung cấp URL Youtube hoặc tên của video \n\n✅ Ví dụ:!play Shape of You "
      );
    else if (!message.member.voice.channel)
      message.channel.send("❌ Bạn phải ở trong một kênh thoại !");
    else {
      if (!servers[message.guild.id])
        servers[message.guild.id] = {
          queue: [],
        };
      const server = servers[message.guild.id];

      const paths = content.match(youtubePlaylistRegex);
      if (paths) {
        getPlaylist(paths[0])
          .then((result) => {
            const resources = result.resources;
            resources.forEach((resource) => {
              server.queue.push({
                requester: message.member.displayName,
                resource: resource,
              });
            });

            const messageEmbed = new MessageEmbed()
              .setColor("#0099ff")
              .setTitle(result.title)
              .setAuthor(
                `Đã thêm vào hàng chờ của danh sách trình phát ${message.member.displayName}`
              )
              .setThumbnail(result.thumbnail)
              .addFields(
                { name: "Tác giả", value: result.author, inline: true },
                {
                  name: "Số lượng video",
                  value: resources.length,
                  inline: true,
                }
              );

            message.channel.send(messageEmbed).then(() => {
              if (!message.guild.voice)
                message.member.voice.channel.join().then((connection) => {
                  play(connection, message);
                });
              else if (!message.guild.voice.connection) {
                message.member.voice.channel.join().then((connection) => {
                  play(connection, message);
                });
              }
            });
          })
          .catch((e) => {
            message.channel.send(JSON.stringify(e));
          });
      } else
        getVideoDetails(content)
          .then((result) => {
            server.queue.push({
              requester: message.member.displayName,
              resource: result,
            });
            const messageEmbed = new MessageEmbed()
              .setColor("#0099ff")
              .setTitle(result.title)
              .setAuthor(`Thềm vào danh sách chờ của ${message.member.displayName}`)
              .setThumbnail(result.thumbnail)
              .addFields(
                { name: "Kênh", value: result.author, inline: true },
                {
                  name: "Thời lượng",
                  value: formatTimeRange(result.length),
                  inline: true,
                }
              )
              .addField("Vị trí theo thứ tự", server.queue.length, true);

            message.channel.send(messageEmbed).then(() => {
              if (!message.guild.voice)
                message.member.voice.channel.join().then((connection) => {
                  play(connection, message);
                });
              else if (!message.guild.voice.connection) {
                message.member.voice.channel.join().then((connection) => {
                  play(connection, message);
                });
              }
            });
          })
          .catch((e) => {
            message.channel.send(JSON.stringify(e));
          });
    }
  },
};