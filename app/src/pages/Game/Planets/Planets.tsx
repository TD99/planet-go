import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { getSolarSystemData } from "@src/lib/solarSystem";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { planetData } from "@src/data/planetData";

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
          ...planetData.find(
            (item: any) => item.englishName == planet.englishName
          ),
          ...planet,
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
          <IonTitle>Planets</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {planet ? (
          <IonGrid>
            <IonRow>
              <IonCol>Name</IonCol>
              <IonCol>{planet.name}</IonCol>
            </IonRow>
            <IonRow>
              <IonCol>English Name</IonCol>
              <IonCol>{planet.englishName}</IonCol>
            </IonRow>
            <IonRow>
              <IonCol>Is Planet</IonCol>
              <IonCol>{planet.isPlanet ? "Yes" : "No"}</IonCol>
            </IonRow>
            <IonRow>
              <IonCol>Semimajor Axis</IonCol>
              <IonCol>{planet.semimajorAxis}</IonCol>
            </IonRow>
            ...
          </IonGrid>
        ) : (
          <>loading ...</>
        )}
      </IonContent>
    </>
  );
};

export default Planets;
