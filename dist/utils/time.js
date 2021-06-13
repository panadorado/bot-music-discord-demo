"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTimeRange = void 0;
// Fomat thời gian video từ giây sang dạng mm:ss
// Ví dụ. 70s -> 01:10
const formatTimeRange = (timeRange) => {
    const hours = Math.trunc(timeRange / 60);
    const mins = Math.floor(timeRange / 60);
    const seconds = timeRange - hours * 60 * 60;
    return `${mins < 10 ? "0" + mins : mins}:${seconds < 10 ? "0" + seconds : seconds}`;
};
exports.formatTimeRange = formatTimeRange;
