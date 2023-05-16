import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonIcon, IonLabel, IonAccordionGroup, IonAccordion, IonImg } from "@ionic/react";
import { warning as warningIcon } from "ionicons/icons";
import './NotFound.css';
import { useLocation } from "react-router";

const ErrorNotFound: React.FC = () => {
  const location = useLocation();

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Seite nicht gefunden</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding not-found-content">
        <IonAccordionGroup>
          <IonAccordion className="modern-accordion rounded">
            <IonItem slot="header" color="danger">
              <IonIcon icon={warningIcon} />
              <IonLabel>Die gewünschte Seite existiert nicht.</IonLabel>
            </IonItem>
            <div className="ion-padding" slot="content">
              <div>
                <b>Datum: </b>
                <span>{new Date().toLocaleString()}</span>
              </div>
              <div>
                <b>Pfad: </b>
                <span>{location.pathname || "Leer"}</span>
              </div>
              <div>
                <b>Query-Parameter: </b>
                <span>{location.search || "Leer"}</span>
              </div>
              <div>
                <b>Hash-Parameter: </b>
                <span>{location.hash || "Leer"}</span>
              </div>
            </div>
          </IonAccordion>
        </IonAccordionGroup>
        <br />
        {/* <IonImg src="/planet-not-found-5.jpg" className="rounded" /> */}
      </IonContent>
    </>
  );
};
  
export default ErrorNotFound;