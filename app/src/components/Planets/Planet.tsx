import { IonButton, IonContent, IonPage } from '@ionic/react';
import { getSolarSystemPlanet } from "@src/lib/solarSystem";
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
 
interface Moon {
    index: number;
    rel: string;
  }

interface Fact {
englishName: string;
moons: Moon[];
mass: {
    massValue: number;
    massExponent: number;
};
vol: {
    volValue: number;
    volExponent: number;
};
density: number;
gravity: number;
meanRadius: number;
discoveredBy: string;
axialTilt: number;
avgTemp: number;
}

const YourComponent = () => {
    const { id } = useParams<{ id: string }>();

  const [solarSystemData, setSolarSystemData] = useState<Fact[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSolarSystemPlanet(id);
        setSolarSystemData(data.bodies);
      } catch (error) {
        console.error('Error fetching solar system data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <IonContent fullscreen className="content">
        <div>
        <table>
            <thead>
            <tr>
                <th>English Name</th>
                <th>Moons</th>
                <th>Mass</th>
                <th>Volume</th>
                <th>Density</th>
                <th>Gravity</th>
                <th>Mean Radius</th>
                <th>Discovered By</th>
                <th>Axial Tilt</th>
                <th>Average Temperature</th>
            </tr>
            </thead>
            <tbody>
            {solarSystemData.map((fact: Fact, index: number) => (
                <tr key={index}>
                <td>{fact.englishName}</td>
                <td>
                    {fact.moons.map((moon: Moon) => (
                        <span key={moon.index}><br /></span>
                    ))}
                </td>
                <td>{fact.mass.massValue}, {fact.mass.massExponent}</td>
                <td>{fact.vol.volValue}, {fact.vol.volExponent}</td>
                <td>{fact.density}</td>
                <td>{fact.gravity}</td>
                <td>{fact.meanRadius}</td>
                <td>{fact.discoveredBy}</td>
                <td>{fact.axialTilt}</td>
                <td>{fact.avgTemp}</td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
      </IonContent>
    </>
  );
};

export default YourComponent;
