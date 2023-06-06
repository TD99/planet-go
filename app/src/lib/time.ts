import { NetworkTime } from "@src/types/interfaces";
import { getUTCJSONTime } from "./api";


export const getNetworkTime = async () => {
    let time;

    try {
        time = (await getUTCJSONTime())?.datetime;
    } catch (e) {
        console.error(e);
        time = getLocalTime()?.datetime;
    }

    return new Date(time);
}

export const getLocalTime = () => {
    return { datetime: new Date().toUTCString() } as NetworkTime;
}