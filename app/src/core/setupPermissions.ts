import { Capacitor } from "@capacitor/core";
import { Geolocation } from "@capacitor/geolocation";
import { AppPermissions, LocationPermissions } from "@src/types/interfaces";

/**
 * All
 */
export async function setupAll() {
    const location = await setupLocationPermission();
    return {...location} as AppPermissions;
}

/**
 * Location
 */
export async function setupLocationPermission() {
    if (Capacitor.isNativePlatform()) {
        const permissionStatus: LocationPermissions = await Geolocation.requestPermissions();
        return permissionStatus;
    }
}