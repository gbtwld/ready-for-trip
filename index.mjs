import { getPriceData, uploadPriceData } from "./src/database.mjs";
import { processData } from "./src/processing.mjs";
import { requestHandler } from "./src/request.mjs";
import { postSlackMessage } from "./src/slackManager.mjs";
import { printLog } from "./src/util/logger.mjs";

const priceDatabase = await getPriceData();
const data = await requestHandler();
const result = processData(data);
const currentData = [...priceDatabase, result[0]];

const dataLength = currentData.length;

uploadPriceData(currentData);

if (currentData[dataLength - 2].TotalFare !== currentData[dataLength - 1].TotalFare) {
    printLog("가격 변동 작업 시작");
    const currentPrice = currentData[dataLength - 1].TotalFare;
    const prevPrice = currentData[dataLength - 2].TotalFare;

    const priceString = currentPrice.toLocaleString("ko-KR");

    const rate = (((currentPrice - prevPrice) / prevPrice) * 100).toFixed(2);

    const url = currentData[dataLength - 1].url;
    const message = `현재 항공권 가격은 ${priceString}원 입니다. (${rate > 0 ? `+${rate}` : `${rate}`}%)`;

    postSlackMessage(message, url);
}
