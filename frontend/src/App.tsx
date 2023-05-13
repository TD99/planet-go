import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home as homeIcon, mapOutline as mapIcon } from 'ionicons/icons';
import { Home, Map } from '@pages/.';
import './assetsImports';

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Redirect exact path="/" to="/home" />
            <Route exact path="/home" render={() => (<Home />)} />
            <Route exact path="/game/map" render={() => (<Map />)} />
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
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
};

export default App;