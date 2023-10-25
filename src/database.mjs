import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
const __dirname = path.resolve();

export const writeData = (data) => {
    if (!existsSync(`${__dirname}/db`)) {
        mkdirSync(`${__dirname}/db`);
    }
    const writeJsonFilePath = path.join(`${__dirname}/db`, `price_database.json`);
    writeFileSync(writeJsonFilePath, JSON.stringify(data, null, 2));
};

export const readPriceData = () => {
    const data = existsSync(`${__dirname}/db/price_database.json`)
        ? JSON.parse(readFileSync(`${__dirname}/db/price_database.json`))
        : [];
    return data;
};
