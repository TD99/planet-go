import { App } from "@capacitor/app";
import { Capacitor } from "@capacitor/core";
import "leaflet/dist/leaflet.css";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRange,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { addTime, getTime } from "@src/converters/time";
import { setupAll } from "@src/core/setupPermissions";
import useLocalStorage from "@src/hooks/useLocalStorage";
import { getNetworkTime } from "@src/lib/time";
import {
  AppPermissions,
  AppSettings,
  TimeFactors,
} from "@src/types/interfaces";
import {
  AndroidSettings,
  IOSSettings,
  NativeSettings,
} from "capacitor-native-settings";
import {
  alertCircle,
  checkmarkCircle,
  expandOutline,
  link,
  mapOutline,
  refreshOutline,
  scale,
} from "ionicons/icons";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

import "./Settings.css";

const Settings: React.FC = () => {
  const [time, setTime] = useState(null as any);
  const [settings, setSettings] = useLocalStorage<AppSettings>("settings", {});
  const [permissions, setPermissions] = useState({
    coarseLocation: false,
    location: false,
  });
  const [scale, setScale] = useState((settings.scale as number) - 1e-3);
  const [solarSystemCenter, setSolarSystemCenter] = useState<[number, number]>([
    46.96183354935441, 7.464583268459782,
  ]);

  useEffect(() => {
    const setTimeStr = async () => {
      const date = await getNetworkTime();
      setTime(date?.toTimeString());
    };
    setTimeStr();

    const setPermissionsObj = async () => {
      const localPermission = await setupAll();
      setPermissions({
        coarseLocation: localPermission.coarseLocation === "granted",
        location: localPermission.location === "granted",
      });
    };
    setPermissionsObj();
  }, []);

  const selectHandler = (e: React.FormEvent<HTMLIonSelectElement>) => {
    const value = e.currentTarget.value;

    switch (value) {
      case "auto":
        break;
      case "dark":
        break;
      case "light":
        break;
    }
  };

  const handlePermissionClick = () => {
    NativeSettings.open({
      optionAndroid: AndroidSettings.ApplicationDetails,
      optionIOS: IOSSettings.App,
    });
  };

  const handleResetClick = () => {
    localStorage.removeItem("settings");
    App.exitApp();
  };

  const handleScaleChange = (e: any) => {
    const value = e.target.value;
    const calcValue = value * 1e-3;

    setScale(calcValue);

    console.log(calcValue);
    setSettings((settings: AppSettings) => ({
      ...settings,
      scale: calcValue + 1e-3,
    }));
  };

  const handleMapClick = (e: any) => {
    const center: [number, number] = [e.latlng.lat, e.latlng.lng];
    setSolarSystemCenter(center);
    setSettings((settings: AppSettings) => ({
      ...settings,
      solarSystemCenter: center,
    }));
  };

  const MapEvents = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="#"></IonBackButton>
          </IonButtons>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <h2>Berechtigungen</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <IonItem>
            <IonIcon
              icon={permissions.coarseLocation ? checkmarkCircle : alertCircle}
              color={permissions.coarseLocation ? "success" : "warn"}
              slot="start"
            />
            <IonLabel>Ungefährer Standort</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon
              icon={permissions.location ? checkmarkCircle : alertCircle}
              color={permissions.location ? "success" : "warn"}
              slot="start"
            />
            <IonLabel>Genauer Standort</IonLabel>
          </IonItem>
        </div>
        <IonChip onClick={handlePermissionClick}>
          <IonIcon icon={link} color="dark" />
          <IonLabel>Berechtigungen verwalten</IonLabel>
        </IonChip>
        <h2>Map</h2>
        <div>
          <IonRange
            className="slider"
            labelPlacement="start"
            min={0}
            max={10}
            color="dark"
            value={scale * 1000}
            ticks
            snaps
            onIonChange={handleScaleChange}
          >
            <IonLabel slot="start" style={{ fontSize: 14 }}>
              Skalierung
            </IonLabel>
            <IonChip slot="end">
              <IonLabel>{scale * 10000 + 100}%</IonLabel>
            </IonChip>
          </IonRange>

          <MapContainer center={solarSystemCenter} zoom={13}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {/* https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png */}
            <Marker position={solarSystemCenter} />
            <MapEvents />
          </MapContainer>
        </div>
        <hr />
        <h2>Entwickleroptionen</h2>
        <IonChip onClick={handleResetClick}>
          <IonIcon icon={refreshOutline} color="dark" />
          <IonLabel>Zurücksetzen</IonLabel>
        </IonChip>
        <br />
        <span>Nativ: {Capacitor.isNativePlatform() ? "Ja" : "Nein"}</span>
        <br />
        <span>Webzeit: {time}</span>
        <br />
        <span>Lokale Zeit: </span>
      </IonContent>
    </>
  );
};

export default Settings;
