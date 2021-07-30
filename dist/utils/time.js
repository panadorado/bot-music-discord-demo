"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTimeRange = void 0;
// Fomat thời gian video từ giây sang dạng mm:ss
// Ví dụ. 70s -> 01:10
const formatTimeRange = (timeRange) => {
    const hours = Math.floor(timeRange / 3600);
    const minutes = Math.floor((timeRange - hours * 3600) / 60);
    const seconds = timeRange - hours * 3600 - minutes * 60;
    if (hours > 0)
        return hours + ':' + minutes + ':' + seconds;
    return minutes + ':' + seconds;
};
exports.formatTimeRange = formatTimeRange;
