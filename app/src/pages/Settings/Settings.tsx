import { IonContent, IonHeader, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";

const Settings: React.FC = () => {
  const selectHandler = (e: React.FormEvent<HTMLIonSelectElement>) => {
    const value = e.currentTarget.value;
    
    switch (value) {
      case 'auto':
        break;
      case 'dark':
        break;
      case 'light':
        break;
    }
  }

  return (
    <>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonSelect aria-label="theme-select" placeholder="Select Theme" label="Theme" onChange={selectHandler}>
          <IonSelectOption value="auto">Dynamic</IonSelectOption>
          <IonSelectOption value="dark">Dark</IonSelectOption>
          <IonSelectOption value="light">Light</IonSelectOption>
        </IonSelect>
      </IonContent>
    </>
  );
};
  
export default Settings;