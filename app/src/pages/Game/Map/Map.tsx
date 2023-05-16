import { Geolocation, Position } from '@capacitor/geolocation';
import { useEffect, useState } from 'react';

const Map: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Position | undefined>(undefined);

  useEffect(() => {
    const getCurrentPosition = async () => {
      try {
        const coordinates = await Geolocation.getCurrentPosition();
        setCoordinates(coordinates);
      } catch (error) {
        alert(error);
      }
    };
    getCurrentPosition();
  }, []);

  return (
    <>
      {coordinates && (
        <div>
          Latitude: {coordinates.coords.latitude} <br />
          Longitude: {coordinates.coords.longitude}
        </div>
      )}
    </>
  );
};

export default Map;