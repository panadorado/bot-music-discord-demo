import { Message } from "discord.js";

import { servers } from "../data/server";

export default {
  name: "pause",
  execute: (message: Message): void => {
    const server = servers[message.guild.id];
    if (server) {
      if (server.dispatcher && server.playing) {
        message.channel.send("⏸ Đã tạm dừng media đang phát").then(() => server.dispatcher.pause());
      }
    } else message.channel.send("❌ Không tìm thấy gì để tạm dừng !");
  },
};