import { IonChip, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";
import { addTime, getTime } from "@src/converters/time";
import { setupAll } from "@src/core/setupPermissions";
import getNetworkTime from "@src/lib/time";
import { AppPermissions, TimeFactors } from "@src/types/interfaces";
import { AndroidSettings, IOSSettings, NativeSettings } from "capacitor-native-settings";
import { alertCircle, checkmarkCircle, link } from "ionicons/icons";
import { useEffect, useState } from "react";

const Settings: React.FC = () => {
  const [time, setTime] = useState(null as any);
  const [permissions, setPermissions] = useState({coarseLocation: false, location: false});

  useEffect(() => {
    const setTimeStr = async () => {
      const date = await getNetworkTime();
      setTime(date?.toTimeString());
    }
    setTimeStr();

    const setPermissionsObj = async () => {
      const localPermission = await setupAll();
      setPermissions({
        coarseLocation: (localPermission.coarseLocation === "granted"),
        location: (localPermission.location === "granted")
      });
    }
    setPermissionsObj();
  }, []);

  const selectHandler = (e: React.FormEvent<HTMLIonSelectElement>) => {
    const value = e.currentTarget.value;
    
    switch (value) {
      case 'auto':
        break;
      case 'dark':
        break;
      case 'light':
        break;
    }
  }

  const handlePermissionClick = () => {
    NativeSettings.open({
      optionAndroid: AndroidSettings.ApplicationDetails,
      optionIOS: IOSSettings.App,
    });
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonSelect aria-label="theme-select" placeholder="Select Theme" label="Theme" onChange={selectHandler}>
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
            <IonIcon icon={permissions.coarseLocation?checkmarkCircle:alertCircle} color={permissions.coarseLocation ? "success" : "warn"} slot="start" />
            <IonLabel>Ungefährer Standort</IonLabel>
          </IonItem>
          <IonItem>
            <IonIcon icon={permissions.location?checkmarkCircle:alertCircle} color={permissions.location ? "success" : "warn"} slot="start" />
            <IonLabel>Genauer Standort</IonLabel>
          </IonItem>
        </div>
        <IonChip onClick={handlePermissionClick}>
          <IonIcon icon={link} color="dark" />
          <IonLabel>Berechtigungen verwalten</IonLabel>
        </IonChip>
      </IonContent>
    </>
  );
};
  
export default Settings;