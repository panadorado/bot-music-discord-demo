import { Message } from 'discord.js';

import { servers } from '../data/server';

export default {
  name: 'resume',
  execute: (message: Message): void => {
    const server = servers[message.guild.id];
    if (server) {
      if (server.dispatcher && server.playing) {
        server.dispatcher.resume();
        message.channel.send('⏯ Tiếp tục phát');
      } else message.channel.send('❌ Không có gì để tiếp tục phát !');
    } else message.channel.send('❌ Không có gì để tiếp tục phát !');
  },
};
