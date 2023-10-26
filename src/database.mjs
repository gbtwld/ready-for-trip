import { S3 } from "@aws-sdk/client-s3";
import "dotenv/config";
import { printLog } from "./util/logger.mjs";

const s3 = new S3({
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    },
    region: "ap-northeast-2",
});

export const uploadPriceData = async (data) => {
    printLog("S3 데이터 업로드 시작");
    // object를 string으로 변환
    const stringObject = JSON.stringify(data);
    const result = await s3.putObject({
        Bucket: "ready-for-trips",
        Key: `db/price_database.json`, // 저장할 경로
        Body: stringObject,
    });
    printLog("S3 데이터 업로드 성공");
};

export const getPriceData = async () => {
    printLog("S3 데이터 가져오는 중");
    const data = await s3.getObject({
        Bucket: "ready-for-trips",
        Key: "db/price_database.json",
    });
    printLog("S3 데이터 가져오기 성공");
    try {
        const jsonString = await data.Body?.transformToString();
        const json = JSON.parse(jsonString ?? "");
        return json;
    } catch (err) {
        printLog(err);
        return null;
    }
};
