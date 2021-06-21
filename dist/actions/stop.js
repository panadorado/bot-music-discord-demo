"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../data/server");
exports.default = {
    name: 'stop',
    execute: (message) => {
        const server = server_1.servers[message.guild.id];
        if (message.guild.voice) {
            if (server) {
                if (server.dispatcher) {
                    for (let i = server.queue.length - 1; i >= 0; i--) {
                        server.queue.splice(i, 1);
                    }
                    server.playing = null;
                    server.dispatcher.end();
                    message.channel.send('Kết thúc và rời khỏi kênh voice !');
                }
            }
            else
                message.channel.send('❌ Không có gì để dừng phát !');
            if (message.guild.voice.connection)
                message.guild.voice.connection.disconnect();
        }
        else
            message.channel.send('❌ Không có gì để dừng phát !');
    },
};
