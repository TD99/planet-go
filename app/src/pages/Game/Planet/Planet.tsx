import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonButtons,
  IonBackButton,
} from "@ionic/react";
import { getSolarSystemData } from "@src/lib/solarSystem";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { planetsData } from "@src/data/planetData";

const Planets: React.FC = () => {
  const { planet: planetName } = useParams<{ planet: string }>();
  const history = useHistory();
  const [planet, setPlanet] = useState<any>();

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getSolarSystemData();
        const planet = data.bodies.find(
          (item: any) =>
            item.englishName.toLowerCase() === planetName.toLowerCase()
        );
        setPlanet({
          ...planet,
          ...planetsData.find(
            (item: any) => item.englishName == planet.englishName
          ),
        });
      } catch (error) {
        console.error(error);
        history.push("/game/map");
      }
    }
    loadData();
  }, []);

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="#" />
          </IonButtons>
          <IonTitle>Planets</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        {planet ? (
          <>
            {/* img */}
            <div className="ion-text-center">
              {planet.img && (
                <img src={`./planets/${planet.img}`} alt={planet.englishName} />
              )}
            </div>

            {/* data */}
            <IonGrid className="ion-padding-bottom">
              <IonRow>
                <IonCol>Name</IonCol>
                <IonCol>{planet.englishName}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Average temperature</IonCol>
                <IonCol>
                  {planet.avgTemp} K / {(planet.avgTemp - 273.15).toFixed(1)} °C
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Year</IonCol>
                <IonCol>{planet.sideralOrbit} Earth days</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Day</IonCol>
                <IonCol>{planet.sideralRotation} hours</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Number of Moons</IonCol>
                <IonCol>{planet.moons ? planet.moons.length : 0}</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Radius</IonCol>
                <IonCol>{planet.meanRadius} km</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Gravity</IonCol>
                <IonCol>{planet.gravity} m/s²</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Density</IonCol>
                <IonCol>{planet.density} g/cm³</IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Mass</IonCol>
                <IonCol>
                  {planet.mass.massValue} x 10
                  <sup>{planet.mass.massExponent}</sup> kg
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Volume</IonCol>
                <IonCol>
                  {planet.vol.volValue} x 10
                  <sup>{planet.vol.volExponent}</sup> km³
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>Orbit radius</IonCol>
                <IonCol>{planet.semimajorAxis} km</IonCol>
              </IonRow>
            </IonGrid>

            {/* description */}
            <p>{planet.description}</p>
          </>
        ) : (
          <>loading ...</>
        )}
      </IonContent>
    </>
  );
};

export default Planets;
