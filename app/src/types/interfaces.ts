/**
 * 
 */
export interface NetworkTime {
    abbreviation?: string;
    client_ip?: string;
    datetime: string;
    day_of_week?: number;
    day_of_year?: number;
    raw_offset?: number;
    timezone?: string;
    unixtime?: number;
    utc_datetime?: string;
    utc_offset?: string;
    week_number?: number;
}