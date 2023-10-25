import { existsSync, mkdirSync, writeFileSync } from "fs";
import path from "path";
const __dirname = path.resolve();

export const jsonLogger = (data) => {
    const date = new Date();
    if (!existsSync(`${__dirname}/log`)) {
        mkdirSync(`${__dirname}/log`);
    }
    const writeJsonFilePath = path.join(`${__dirname}/log`, `${date.toLocaleString("ko")}.json`);
    writeFileSync(writeJsonFilePath, JSON.stringify(data, null, 2));
};
