import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
const __dirname = path.resolve();

export const jsonLogger = (data) => {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const koreaTimeDiff = 9 * 60 * 60 * 1000;
    const korNow = new Date(utc + koreaTimeDiff);
    if (!existsSync(`${__dirname}/log`)) {
        mkdirSync(`${__dirname}/log`);
    }
    const writeJsonFilePath = path.join(`${__dirname}/log`, `${korNow.toLocaleString("ko")}.json`);
    writeFileSync(writeJsonFilePath, JSON.stringify(data, null, 2));
};
