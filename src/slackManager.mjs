import { WebClient } from "@slack/web-api";
import "dotenv";
import { printLog } from "./util/logger.mjs";

const web = new WebClient(process.env.SLACK_TOKEN);

export const postSlackMessage = async (message, url) => {
    const result = await web.chat.postMessage({
        text: message,
        channel: "가격변동",
    });
    await web.chat.postMessage({
        text: url,
        channel: "가격변동",
        thread_ts: result.ts,
    });
    printLog("Slack 메시지 전송 완료");
};
