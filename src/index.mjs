import { processData } from "./processing.mjs";
import { requestHandler } from "./request.mjs";

const data = await requestHandler();

processData(data);
