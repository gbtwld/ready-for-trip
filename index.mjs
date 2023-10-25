import { readPriceData, writeData } from "./src/database.mjs";
import { processData } from "./src/processing.mjs";
import { requestHandler } from "./src/request.mjs";
import { postSlackMessage } from "./src/slackManager.mjs";

const priceDatabase = readPriceData();

const data = await requestHandler();

const result = processData(data);

writeData([...priceDatabase, result[0]]);

postSlackMessage("Test");
