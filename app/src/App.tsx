import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  cartOutline as cartOutlineIcon,
  home as homeIcon,
  mapOutline as mapIcon,
  planetOutline as planetOutlineIcon,
  settingsOutline as settingsOutlineIcon,
  warning as warningIcon,
} from "ionicons/icons";
import { setupLocationPermission } from "@core/setupPermissions";
import { ErrorNotFound, Home, Map, Planets, Settings } from "@pages/.";
import "./assetsImports";
import {
  AndroidSettings,
  IOSSettings,
  NativeSettings,
} from "capacitor-native-settings";
import { App as NativeApp } from "@capacitor/app";
import { setupStatusBarDark } from "./core/setupTheme";

setupIonicReact();
setupLocationPermission().then((e) => {
  if (e?.coarseLocation === "prompt" || e?.coarseLocation === "denied") {
    let proceed = confirm(
      "Die App konnte nicht gestartet werden, da die folgende Berechtigung fehlt: Standort\n\nZu den Einstellungen wechseln?"
    );
    if (proceed) {
      NativeSettings.open({
        optionAndroid: AndroidSettings.ApplicationDetails,
        optionIOS: IOSSettings.App,
      });
    } else {
      NativeApp.exitApp();
    }
  }

  if (e?.location === "prompt" || e?.location === "denied") {
    let proceed = confirm(
      "Die App wird eingeschränkt durch die folgende Berechtigung: Ungenauer Standort\n\nZu den Einstellungen wechseln?"
    );
    if (proceed) {
      NativeSettings.open({
        optionAndroid: AndroidSettings.ApplicationDetails,
        optionIOS: IOSSettings.App,
      });
    }
  }
});
setupStatusBarDark();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/home" />
          <Route exact path="/home" render={() => <Home />} />
          <Route exact path="/game/map" render={() => <Map />} />
          <Route exact path="/game/planet/:planet" render={() => <Planets />} />
          <Route exact path="/settings" render={() => <Settings />} />
          <Route render={() => <ErrorNotFound />} />
        </IonRouterOutlet>
        <IonTabBar
          slot="bottom"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={homeIcon} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href="/settings">
            <IonIcon icon={settingsOutlineIcon} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
