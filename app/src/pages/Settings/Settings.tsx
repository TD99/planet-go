import { IonContent, IonHeader, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";

const Settings: React.FC = () => {
  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonSelect aria-label="dark" placeholder="Select Theme" label="Theme">
          <IonSelectOption value="auto">Dynamic</IonSelectOption>
          <IonSelectOption value="dark">Dark</IonSelectOption>
          <IonSelectOption value="light">Light</IonSelectOption>
        </IonSelect>
      </IonContent>
    </>
  );
};
  
export default Settings;