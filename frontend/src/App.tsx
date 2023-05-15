import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact, useIonViewDidEnter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { home as homeIcon, mapOutline as mapIcon } from 'ionicons/icons';
import { Home, Map } from '@pages/.';
import './assetsImports';
import { useEffect, useState } from 'react';

setupIonicReact();

const App: React.FC = () => {
  const [showTabBar, setShowTabBar] = useState(true);

  function renderRoutes() {
    return (
      <IonRouterOutlet>
        <Redirect exact path="/" to="/home" />
        <Route exact path="/home" render={() => <Home />} />
        <Route exact path="/game/map" render={() => <Map />} />
      </IonRouterOutlet>
    )
  }

  return (
    <IonApp>
      <IonReactRouter>
        {
          showTabBar ? (
          <IonTabs>
            {
              renderRoutes()
            }

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
        ) : (
          renderRoutes()
        )}
      </IonReactRouter>
    </IonApp>
  )
};

export default App;