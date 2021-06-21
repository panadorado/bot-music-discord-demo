"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../data/server");
exports.default = {
    name: 'clear',
    execute: (message) => {
        const server = server_1.servers[message.guild.id];
        if (server) {
            server.queue = [];
            message.channel.send('🧹 Danh sách phát đã được dọn dẹp! ');
        }
        else {
            message.channel.send('❌ Không có gì để xóa ở đây cả !');
        }
    },
};
