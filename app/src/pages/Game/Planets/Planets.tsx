import { IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";
import { Route } from 'react-router-dom';
import Planet from '@components/Planets/Planet';
import { useHistory } from "react-router-dom";



const Planets: React.FC = () => {

  const history = useHistory();

  const handleClick = () => {
    history.push("/plants/123");
  };

    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Planets</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <button onClick={handleClick}>Go to plant 123</button>
        </IonContent>
      </>
    );
  };
  
export default Planets;