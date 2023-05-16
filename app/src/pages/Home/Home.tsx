import { IonButton, IonContent, IonPage } from '@ionic/react';
import './Home.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [dots, setDots] = useState([]);

  const genStars = () => {
    const dmin = 20;
    const dmax = 100;
    const ndots = Math.floor(Math.random() * (dmax - dmin + 1)) + dmin; // number of white dots
    
    const fmin = 1;
    const fmax = ndots / 4;
    const nflicker = Math.floor(Math.random() * (fmax - fmin + 1)) + fmin; // number of flickering dots
    
    const dots = [];
    
    for (let i = 0; i < ndots; i++) {
      const margin = 2;
      const x = Math.random() * (100 - 2 * margin) + margin;
      const y = Math.random() * (100 - 2 * margin) + margin;
      
      dots.push(<div key={i} className={`dot ${(i < nflicker) && "flicker"}`} style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${Math.random()}s` }} />);
    }
   
    return dots as [];
  }

  useEffect(() => {
    setDots(genStars());
  }, []);

  return (
    <>
      <IonContent fullscreen className="content">
        <div className='dots-container'>
          {dots}
        </div>
        <div className='container'>
          <h1>PlanetGo</h1>
          <Link to="/game/map">
            <IonButton className='start-button'>Start</IonButton>
          </Link>
        </div>
      </IonContent>
    </>
  );
};

export default Home;