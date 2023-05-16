import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import {
  cartOutline as cartOutlineIcon,
  home as homeIcon,
  mapOutline as mapIcon,
  planetOutline as planetOutlineIcon,
  settingsOutline as settingsOutlineIcon,
  warning as warningIcon
} from 'ionicons/icons';
import { ErrorNotFound, Home, Map, Orbit, Planets, Settings, Shop } from '@pages/.';
import './assetsImports';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/home" />
          <Route exact path="/home" render={() => <Home />} />
          <Route exact path="/game/map" render={() => <Map />} />
          <Route exact path="/game/orbit" render={() => <Orbit />} />
          <Route exact path="/game/planets" render={() => <Planets />} />
          <Route exact path="/game/shop" render={() => <Shop />} />
          <Route exact path="/settings" render={() => <Settings />} />
          <Route render={() => <ErrorNotFound />} />
        </IonRouterOutlet>
        <IonTabBar slot='bottom'>
          <IonTabButton tab="home" href='/home'>
            <IonIcon icon={homeIcon} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="map" href='/game/map'>
            <IonIcon icon={mapIcon} />
            <IonLabel>Map</IonLabel>
          </IonTabButton>
          <IonTabButton tab="orbit" href='/game/orbit'>
            <IonIcon icon={planetOutlineIcon} />
            <IonLabel>Orbit</IonLabel>
          </IonTabButton>
          <IonTabButton tab="planets" href='/game/planets'>
            <IonIcon icon={planetOutlineIcon} />
            <IonLabel>Planets</IonLabel>
          </IonTabButton>
          <IonTabButton tab="shop" href='/game/shop'>
            <IonIcon icon={cartOutlineIcon} />
            <IonLabel>Shop</IonLabel>
          </IonTabButton>
          <IonTabButton tab="settings" href='/settings'>
            <IonIcon icon={settingsOutlineIcon} />
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
          <IonTabButton tab="errorNotFound" href='/404'>
            <IonIcon icon={warningIcon} />
            <IonLabel>404</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;