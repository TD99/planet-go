import { Geolocation, Position } from "@capacitor/geolocation";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Circle, useMap } from "react-leaflet";
import { PointExpression, icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { IonButton, IonIcon } from "@ionic/react";
import { compass } from "ionicons/icons";

function kmToLatLong(km: number) {
  const earthRadius = 6371; // Earth's radius in km
  const lat = km / earthRadius;
  const long = km / (earthRadius * Math.cos((Math.PI * lat) / 180));
  return { lat: lat, long: long };
}

const initialZoom = 16;

const iconSize: PointExpression = [50, 50];

const locationIcon = icon({
  iconUrl:
    "https://cdn.icon-icons.com/icons2/1369/PNG/512/-navigation_90505.png",
  iconSize: iconSize,
  iconAnchor: [iconSize[0] / 2, iconSize[1] / 2],
  className: "custom-marker-icon",
});

const planets = [
  { name: "Mercury", orbitRadius: 57909050, angle: 0 },
  { name: "Venus", orbitRadius: 108208000, angle: 0 },
  { name: "Earth", orbitRadius: 149598023, angle: 0 },
  { name: "Mars", orbitRadius: 227939200, angle: 0 },
  { name: "Jupiter", orbitRadius: 778547200, angle: 0 },
  { name: "Saturn", orbitRadius: 1433449370, angle: 0 },
  { name: "Uranus", orbitRadius: 2876679082, angle: 0 },
  { name: "Neptune", orbitRadius: 4503443661, angle: 0 },
];

const scale = 5e-8; // scale factor to adjust the size of the orbits

const Map: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Position | null>(null);
  const [rotation, setRotation] = useState(45);
  const solarSystemCenter = [46.96183354935441, 7.464583268459782];

  useEffect(() => {
    let watchId: string;
    const watchPosition = async () => {
      try {
        watchId = await Geolocation.watchPosition({}, (position, err) => {
          if (err) {
            alert(err);
          } else {
            setCoordinates(position);
            console.log(position);
          }
        });
      } catch (error) {
        alert(error);
      }
    };
    watchPosition();
    return () => {
      Geolocation.clearWatch({ id: watchId });
    };
  }, []);

  useEffect(() => {
    const handleDeviceOrientation = (event: any) => {
      if (!event.alpha) return;
      setRotation(event.alpha);
      console.log(event.alpha);
    };

    window.addEventListener("deviceorientation", handleDeviceOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, []);

  if (!coordinates) {
    return <div>Loading...</div>;
  }

  return (
    <MapContainer
      center={[coordinates.coords.latitude, coordinates.coords.longitude]}
      zoom={initialZoom}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      />

      {/* User location */}
      <Marker
        position={[coordinates.coords.latitude, coordinates.coords.longitude]}
        icon={locationIcon}
        rotationAngle={rotation}
      />

      <CompassButton position={coordinates} />
      {
        // draw planets and their orbits
        planets.map((planet) => {
          // calculate x and y coordinates of planet based on its orbit radius and angle
          let x = planet.orbitRadius * Math.cos(planet.angle) * scale;
          let y = planet.orbitRadius * Math.sin(planet.angle) * scale;

          x = solarSystemCenter[0] + kmToLatLong(x).lat;
          y = solarSystemCenter[1] + kmToLatLong(y).long;

          return (
            <>
              {/* Orbit */}
              <Circle
                center={solarSystemCenter}
                radius={planet.orbitRadius * scale * 17.5} // TODO
                fillOpacity={0}
                color="red"
                weight={2}
              />

              {/* Planet */}
              <Circle center={[x, y]} radius={10} fillOpacity={1} />
            </>
          );
        })
      }
    </MapContainer>
  );
};

const CompassButton: React.FC<{ position: Position }> = ({ position }) => {
  const map = useMap();

  const handleCompassClick = async () => {
    console.log(map);
    map.flyTo(
      [position.coords.latitude, position.coords.longitude],
      initialZoom
    );
  };

  return (
    <IonButton
      onClick={handleCompassClick}
      className="compass-button"
      color="primary"
      shape="round"
      fill="clear"
      size="large"
    >
      <IonIcon icon={compass} />
    </IonButton>
  );
};

export default Map;
