import { IonButton, IonContent, IonGrid, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  const n = 250; // number of white dots
  const dots = [];

  for (let i = 0; i < n; i++) {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    dots.push(<div className="dot" style={{ left: x, top: y }} />);
  }

  return (
    <IonPage>
      <IonContent fullscreen className="content">
        <div>
          {dots}
        </div>
        <div className='container'>
          <IonButton className='start-button'>Start</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
