import moment from "moment-timezone";

let logBuf = [];

export const printLog = (log) => {
    const time = moment().tz("Asia/Seoul").format("HH:mm:ss");
    const count = logBuf.filter((value) => value === log).length;
    console.log(`[${time}] ${log}${count > 0 ? ` (${count + 1})` : ""}`);
    logBuf.push(log);
};
