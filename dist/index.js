"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
dotenv_1.config();
const express_1 = __importDefault(require("express"));
const heroku_awake_1 = __importDefault(require("heroku-awake"));
const discord_js_1 = require("discord.js");
const play_1 = __importDefault(require("./actions/play"));
const skip_1 = __importDefault(require("./actions/skip"));
const nowplaying_1 = __importDefault(require("./actions/nowplaying"));
const pause_1 = __importDefault(require("./actions/pause"));
const resume_1 = __importDefault(require("./actions/resume"));
const stop_1 = __importDefault(require("./actions/stop"));
const clear_1 = __importDefault(require("./actions/clear"));
const port = process.env.PORT || 3000;
const server = express_1.default();
const url = 'https://discordbot-music-ss.herokuapp.com/'; // Đường dẫn của app bạn trên Heroku
const bot = () => {
    const client = new discord_js_1.Client();
    const token = process.env.TOKEN;
    const prefix = '!';
    client.on('message', (message) => {
        const args = message.content.substring(prefix.length).split(' ');
        const content = message.content.substring(prefix.length + args[0].length);
        //console.log(content);
        const arrType = [`Nhạc: ${content}`, `Youtube: ${content}`];
        setInterval(() => {
            const index = Math.floor(Math.random() * arrType.length);
            client.user.setActivity(arrType[index]);
        }, 10000);
        if (message.content[0] === '!') {
            switch (args[0]) {
                case play_1.default.name: {
                    play_1.default.execute(message, content);
                    break;
                }
                case skip_1.default.name: {
                    skip_1.default.execute(message);
                    break;
                }
                case nowplaying_1.default.name.toString(): {
                    nowplaying_1.default.execute(message);
                    break;
                }
                case pause_1.default.name: {
                    pause_1.default.execute(message);
                    break;
                }
                case resume_1.default.name: {
                    resume_1.default.execute(message);
                    break;
                }
                case stop_1.default.name: {
                    stop_1.default.execute(message);
                    break;
                }
                case clear_1.default.name: {
                    clear_1.default.execute(message);
                    break;
                }
            }
        }
    });
    client.on('ready', () => {
        console.log('🏃‍♀️ Super Sick is online! 💨');
    });
    client.once('reconnecting', () => {
        console.log('🔗 Reconnecting!');
    });
    client.once('disconnect', () => {
        console.log('🛑 Disconnect!');
    });
    client.login(token);
};
server.disable('x-powered-by');
server.listen(port, () => {
    bot();
    heroku_awake_1.default(url);
    console.log(`🚀 Server is running on port ${port} ✨`);
});
