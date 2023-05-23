import { getUTCJSONTime } from "./api";

const getNetworkTime = async () => {
    try {
        const time = await getUTCJSONTime() || new Date().toUTCString();
        return new Date(time.datetime);
    } catch (e) {
        console.error(e);
    }
}