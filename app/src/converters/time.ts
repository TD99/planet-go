import { AbsoluteTimeData, TimeFactors } from "@src/types/interfaces";

export const addTime = (date: Date, timeData: AbsoluteTimeData) => {
    const time = new Date(date.getTime() + getTime(timeData.value, timeData.factor));
    return time;
}

export const getTime = (value: number, format: TimeFactors) => {
    return value * format;
}