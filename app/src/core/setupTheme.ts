import { Capacitor } from "@capacitor/core";
import { StatusBar } from "@capacitor/status-bar";

/**
 * StatusBar
 */

export function setupStatusBarDark() {
    if (Capacitor.isNativePlatform()) {
        StatusBar.setBackgroundColor({ color: "#000000" });
    }
}

export function setupStatusBarLight() {
    if (Capacitor.isNativePlatform()) {
        StatusBar.setBackgroundColor({ color: "#FFFFFF" });
    }
}