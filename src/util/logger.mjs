let logBuf = [];

export const printLog = (log) => {
    const date = new Date();
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : `${date.getHours()}`;
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : `${date.getMinutes()}`;
    const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : `${date.getSeconds()}`;
    const count = logBuf.filter((value) => value === log).length;
    console.log(`[${hours}:${minutes}:${seconds}] ${log}${count > 0 ? ` (${count + 1})` : ""}`);
    logBuf.push(log);
};
