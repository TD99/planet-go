import { Geolocation, Position } from "@capacitor/geolocation";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { PointExpression, icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";
import { IonButton, IonIcon } from "@ionic/react";
import { compass } from "ionicons/icons";

import SolarSystem from "@src/components/SolarSystem/SolarSystem";
import RotatableMarker from "@src/components/RotatableMarker/RotatableMarker";

const initialZoom = 16;

const userIconSize: PointExpression = [50, 50];

const locationIcon = icon({
  iconUrl:
    "https://cdn.icon-icons.com/icons2/1369/PNG/512/-navigation_90505.png",
  iconSize: userIconSize,
  iconAnchor: [userIconSize[0] / 2, userIconSize[1] / 2],
  className: "custom-marker-icon",
});

const Map = () => {
  const [coordinates, setCoordinates] = useState<Position | null>(null);
  const [rotation, setRotation] = useState(0);
  const solarSystemCenter: [number, number] = [
    46.96183354935441, 7.464583268459782,
  ];

  useEffect(() => {
    let watchId: string;
    const watchPosition = async () => {
      try {
        watchId = await Geolocation.watchPosition({}, (position) => {
          setCoordinates(position);
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
    };

    window.addEventListener("deviceorientation", handleDeviceOrientation);

    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation);
    };
  }, []);

  if (!coordinates) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
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
      <RotatableMarker
        position={[coordinates.coords.latitude, coordinates.coords.longitude]}
        rotation={rotation}
        icon="https://cdn.icon-icons.com/icons2/1369/PNG/512/-navigation_90505.png"
        iconSize={userIconSize}
        iconAnchor={[userIconSize[0] / 2, userIconSize[1] / 2]}
      />

      <CompassButton position={coordinates} />

      <SolarSystem solarSystemCenter={solarSystemCenter} />
    </MapContainer>
  );
};

const CompassButton: React.FC<{ position: Position }> = ({ position }) => {
  const map = useMap();

  const handleCompassClick = () => {
    map.flyTo(
      [position.coords.latitude, position.coords.longitude],
      initialZoom
    );
  };

  return (
    <IonButton
      onClick={handleCompassClick}
      className="compass-button"
      color="medium"
      shape="round"
      fill="clear"
      size="large"
    >
      <IonIcon icon={compass} />
    </IonButton>
  );
};

export default Map;
