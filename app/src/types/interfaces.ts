/**
 * Network Time (for Services)
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

/**
 * Location Permissions (for Services)
 */

export interface LocationPermissions {
    coarseLocation: string;
    location: string;
}

/**
 * AppPermissions
 */

export interface AppPermissions extends LocationPermissions {
}

/**
 * AbsoluteTimeData
 */

export enum TimeFactors {
    MILLISECONDS = 1,
    SECONDS = 1 * 1000,
    MINUTES = 1 * 1000 * 60,
    HOURS = 1 * 1000 * 60 * 60,
    DAYS = 1 * 1000 * 60 * 60 * 24,
    WEEKS = 1 * 1000 * 60 * 60 * 24 * 7,
    MONTHS = 1 * 1000 * 60 * 60 * 24 * 7 * 4,
    YEARS = 1 * 1000 * 60 * 60 * 24 * 7 * 4 * 12
}  

export interface AbsoluteTimeData {
    factor: TimeFactors,
    value: number;
}