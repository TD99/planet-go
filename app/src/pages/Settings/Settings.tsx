import {
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
import getNetworkTime from "@src/lib/time";
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
import { alertCircle, checkmarkCircle, link, scale } from "ionicons/icons";
import { useEffect, useState } from "react";

const Settings: React.FC = () => {
  const [time, setTime] = useState(null as any);
  const [settings, setSettings] = useLocalStorage<AppSettings>("settings", {});
  const [permissions, setPermissions] = useState({
    coarseLocation: false,
    location: false,
  });
  const [scale, setScale] = useState(settings.scale as number);

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

  const handleScaleChange = (e: any) => {
    const value = e.target.value;
    const calcValue = value * 1e-3;

    setScale(calcValue);

    console.log(calcValue);
    setSettings((settings: AppSettings) => ({
      ...settings,
      scale: calcValue,
    }));
  };

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonSelect
          aria-label="theme-select"
          placeholder="Select Theme"
          label="Theme"
          onChange={selectHandler}
        >
          <IonSelectOption value="auto">Dynamic</IonSelectOption>
          <IonSelectOption value="dark">Dark</IonSelectOption>
          <IonSelectOption value="light">Light</IonSelectOption>
        </IonSelect>
        <hr />
        <span>Time: {time}</span>
        <hr />
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
        <IonRange
          className="slider"
          labelPlacement="start"
          min={0}
          max={10}
          defaultValue={scale || 0}
          onIonChange={handleScaleChange}
        >
          <IonLabel slot="start">Scale</IonLabel>
        </IonRange>
        <IonLabel>{scale}</IonLabel>
      </IonContent>
    </>
  );
};

export default Settings;
