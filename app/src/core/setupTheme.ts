import { StatusBar } from "@capacitor/status-bar";

/**
 * StatusBar
 */

export function setupStatusBarDark() {
    StatusBar.setBackgroundColor({ color: "#000000" });
}

export function setupStatusBarLight() {
    StatusBar.setBackgroundColor({ color: "#FFFFFF" });
}