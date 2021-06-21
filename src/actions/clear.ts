// Xoá toàn bộ list video đang đợi phát
import { Message } from 'discord.js';

import { servers } from '../data/server';

export default {
  name: 'clear',
  execute: (message: Message): void => {
    const server = servers[message.guild.id];
    if (server) {
      server.queue = [];
      message.channel.send('🧹 Danh sách phát đã được dọn dẹp! ');
    } else {
      message.channel.send('❌ Không có gì để xóa ở đây cả !');
    }
  },
};
