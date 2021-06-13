// Xoá toàn bộ list video đang đợi phát
import { Message } from "discord.js";

import { servers } from "../data/server";

export default {
  name: "clear",
  execute: (message: Message): void => {
    const server = servers[message.guild.id];
    if (server) {
      server.queue = [];
      message.channel.send("🧹 Đã xóa khỏi danh sách hàng chờ !");
    } else {
      message.channel.send("❌ Không tìm thấy gì trong danh sách hàng chờ !");
    }
  },
};