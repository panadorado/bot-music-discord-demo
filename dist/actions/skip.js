"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const time_1 = require("../utils/time");
const server_1 = require("../data/server");
exports.default = {
    name: "skip",
    execute: (message) => {
        const server = server_1.servers[message.guild.id];
        if (server) {
            if (server.dispatcher) {
                if (server.queue.length === 0) {
                    server.dispatcher.end();
                    server.playing = null;
                    message.channel.send("❌ Không tìm thấy gì trong hàng đợi để bỏ qua !");
                }
                else {
                    const song = server.queue[0];
                    const messageEmbed = new discord_js_1.MessageEmbed()
                        .setColor("#0099ff")
                        .setTitle(song.resource.title)
                        .setAuthor(`ĐƯợc bỏ qua bởi ${message.member.displayName}`)
                        .setThumbnail(song.resource.thumbnail)
                        .addFields({ name: "Kênh", value: song.resource.author, inline: true }, {
                        name: "Thời lượng",
                        value: time_1.formatTimeRange(song.resource.length),
                        inline: true,
                    });
                    message.channel
                        .send(messageEmbed)
                        .then(() => server.dispatcher.end());
                }
            }
            else
                message.channel.send("❌ Không tìm thấy bài hát nào trong hàng đợi để bỏ qua !");
        }
        else {
            message.channel.send("❌ Không tìm thấy bài hát nào trong hàng đợi để bỏ qua !");
        }
    },
};