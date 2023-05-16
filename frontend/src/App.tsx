import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cartOutline as cartOutlineIcon, home as homeIcon, mapOutline as mapIcon, planetOutline as planetOutlineIcon } from 'ionicons/icons';
import { Home, Map, Orbit, Planets, Shop } from '@pages/.';
import './assetsImports';
import { useState } from 'react';

setupIonicReact();

const App: React.FC = () => {
  const [showTabBar, setShowTabBar] = useState(true);

  function renderRoutes() {
    return (
      <IonRouterOutlet>
        <Redirect exact path="/" to="/home" />
        <Route exact path="/home" render={() => <Home />} />
        <Route exact path="/game/map" render={() => <Map />} />
        <Route exact path="/game/orbit" render={() => <Orbit />} />
        <Route exact path="/game/planets" render={() => <Planets />} />
        <Route exact path="/game/shop" render={() => <Shop />} />
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
              <IonTabButton tab="orbit" href='/game/orbit'>
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