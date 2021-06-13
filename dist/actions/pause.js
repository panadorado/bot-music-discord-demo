"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("../data/server");
exports.default = {
    name: "pause",
    execute: (message) => {
        const server = server_1.servers[message.guild.id];
        if (server) {
            if (server.dispatcher && server.playing) {
                message.channel.send("⏸ Đã tạm dừng media đang phát").then(() => server.dispatcher.pause());
            }
        }
        else
            message.channel.send("❌ Không tìm thấy gì để tạm dừng !");
    },
};
