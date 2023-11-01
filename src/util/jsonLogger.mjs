import { existsSync, mkdirSync, writeFileSync } from "fs";
import moment from "moment-timezone";
import path from "path";
const __dirname = path.resolve();

export const jsonLogger = (data) => {
    const date = moment().tz("Asia/Seoul").format("YYYY.MM.DD_HH:mm:ss");
    if (!existsSync(`${__dirname}/log`)) {
        mkdirSync(`${__dirname}/log`);
    }
    const writeJsonFilePath = path.join(`${__dirname}/log`, `${date}.json`);
    writeFileSync(writeJsonFilePath, JSON.stringify(data, null, 2));
};
