import { NetworkTime } from "@src/types/interfaces";

/**
 * Network Time Fetches
 */

const ntpURL = 'https://worldtimeapi.org/api/timezone/Etc/UTC';

export async function getUTCJSONTime() {
    const response = await fetch(ntpURL, {
        method: 'GET'
    });

    if (!response.ok) {
        return Promise.reject(response);
    }

    const data: NetworkTime = await response.json();
    return data;
}