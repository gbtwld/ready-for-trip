import { WebClient } from "@slack/web-api";

const web = new WebClient(process.env.SLACK_TOKEN);

export const postSlackMessage = async (message) => {
    const result = await web.chat.postMessage({
        text: message,
        channel: "가격변동",
    });
    console.log(result);
};
