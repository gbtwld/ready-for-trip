import { jsonLogger } from "./util/jsonLogger.mjs";

export const processData = (data) => {
    let totalFareResult = [];
    const faresObj = Object.values(data.fares);
    faresObj.map((fares) => {
        fares.fare["A01"].map((singleFare) => {
            const fare = parseInt(singleFare.Adult.Fare);
            const naverFare = parseInt(singleFare.Adult.NaverFare);
            const tax = parseInt(singleFare.Adult.Tax);
            const qCharge = parseInt(singleFare.Adult.QCharge);

            const trueFare = Math.ceil(+naverFare > 0 ? +naverFare : +fare);

            const totalFare = trueFare + qCharge + tax;

            totalFareResult.push({ TotalFare: totalFare, ...singleFare });
        });
    });
    jsonLogger(totalFareResult.sort((a, b) => a.TotalFare - b.TotalFare));
};
