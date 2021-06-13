"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../data/server");
exports.default = {
    name: "clear",
    execute: (message) => {
        const server = server_1.servers[message.guild.id];
        if (server) {
            server.queue = [];
            message.channel.send("🧹 Đã xóa khỏi danh sách hàng chờ !");
        }
        else {
            message.channel.send("❌ Không tìm thấy gì trong danh sách hàng chờ !");
        }
    },
};
