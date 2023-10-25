import { GraphQLClient, gql } from "graphql-request";
import _ from "lodash";
import wait from "waait";

const NUM_OF_PEOPLE = 3;
const DEPARTURE_AIRPORT = "GMP";
const ARRIVAL_AIRPORT = "HND";
const START_DATE = "20240329";
const END_DATE = "20240401";

const URL = "https://airline-api.naver.com/graphql";

const QUERY = gql`
    query getInternationalList(
        $trip: String!
        $itinerary: [InternationalList_itinerary]!
        $adult: Int = 1
        $child: Int = 0
        $infant: Int = 0
        $fareType: String!
        $where: String = "pc"
        $isDirect: Boolean = false
        $stayLength: String
        $galileoKey: String
        $galileoFlag: Boolean = true
        $travelBizKey: String
        $travelBizFlag: Boolean = true
    ) {
        internationalList(
            input: {
                trip: $trip
                itinerary: $itinerary
                person: { adult: $adult, child: $child, infant: $infant }
                fareType: $fareType
                where: $where
                isDirect: $isDirect
                stayLength: $stayLength
                galileoKey: $galileoKey
                galileoFlag: $galileoFlag
                travelBizKey: $travelBizKey
                travelBizFlag: $travelBizFlag
            }
        ) {
            galileoKey
            galileoFlag
            travelBizKey
            travelBizFlag
            totalResCnt
            resCnt
            results {
                airlines
                airports
                fareTypes
                schedules
                fares
                errors
            }
        }
    }
`;

const HEADERS = {
    Referer: `https://flight.naver.com/flights/international/${DEPARTURE_AIRPORT}-${ARRIVAL_AIRPORT}-${START_DATE}/${ARRIVAL_AIRPORT}-${DEPARTURE_AIRPORT}-${END_DATE}?adult=${NUM_OF_PEOPLE}&isDirect=true&fareType=Y`,
};

const client = new GraphQLClient(URL, { errorPolicy: "all", headers: HEADERS });

export const requestHandler = async () => {
    let resultObj = {};

    let requestVariables = {
        adult: NUM_OF_PEOPLE,
        child: 0,
        infant: 0,
        where: "pc",
        isDirect: true,
        galileoFlag: true,
        travelBizFlag: true,
        fareType: "Y",
        itinerary: [
            { departureAirport: DEPARTURE_AIRPORT, arrivalAirport: ARRIVAL_AIRPORT, departureDate: START_DATE },
            { departureAirport: ARRIVAL_AIRPORT, arrivalAirport: DEPARTURE_AIRPORT, departureDate: END_DATE },
        ],
        stayLength: "",
        trip: "RT",
        galileoKey: "",
        travelBizKey: "",
    };

    try {
        while (requestVariables.galileoFlag || requestVariables.travelBizFlag) {
            const res = await client.request(QUERY, requestVariables);
            _.merge(resultObj, res.internationalList.results);
            if (requestVariables.galileoKey === "" || requestVariables.travelBizKey === "") {
                requestVariables.galileoKey = res.internationalList.galileoKey;
                requestVariables.travelBizKey = res.internationalList.travelBizKey;
            }
            requestVariables.galileoFlag = res.internationalList.galileoFlag;
            requestVariables.travelBizFlag = res.internationalList.travelBizFlag;
            await wait(500);
        }
        return resultObj;
    } catch (error) {
        console.error(error);
    }
};
