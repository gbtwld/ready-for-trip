export const processData = (data) => {
    let totalFareResult = [];

    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
    const koreaTimeDiff = 9 * 60 * 60 * 1000;
    const korNow = new Date(utc + koreaTimeDiff);

    const faresObj = Object.values(data.fares);
    faresObj.map((fares) => {
        fares.fare["A01"].map((singleFare) => {
            const fare = parseInt(singleFare.Adult.Fare);
            const naverFare = parseInt(singleFare.Adult.NaverFare);
            const tax = parseInt(singleFare.Adult.Tax);
            const qCharge = parseInt(singleFare.Adult.QCharge);

            const trueFare = Math.ceil(+naverFare > 0 ? +naverFare : +fare);

            const totalFare = trueFare + qCharge + tax;

            totalFareResult.push({
                TotalFare: totalFare,
                ScrapTime: korNow.toLocaleString("ko"),
                url: singleFare.ReserveParameter["#cdata-section"],
            });
        });
    });
    return totalFareResult.sort((a, b) => a.TotalFare - b.TotalFare);
};
