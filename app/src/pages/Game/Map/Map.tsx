import { Geolocation, Position } from "@capacitor/geolocation";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { PointExpression, icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

let iconSize: PointExpression | undefined = [50, 50];

const locationIcon = icon({
  iconUrl:
    "https://cdn.icon-icons.com/icons2/1369/PNG/512/-navigation_90505.png",
  iconSize: iconSize,
  iconAnchor: [iconSize[0] / 2, iconSize[1] / 2],
  className: "custom-marker-icon",
});

const Map: React.FC = () => {
  const [coordinates, setCoordinates] = useState<Position | null>(null);

  useEffect(() => {
    let watchId: string;
    const watchPosition = async () => {
      try {
        watchId = await Geolocation.watchPosition({}, (position, err) => {
          if (err) {
            alert(err);
          } else {
            setCoordinates(position);
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
    console.log(coordinates);
  }, [coordinates]);

  if (!coordinates) {
    return <div>Loading...</div>;
  }

  return (
    <MapContainer
      center={[coordinates.coords.latitude, coordinates.coords.longitude]}
      zoom={13}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
      />
      <Marker
        position={[coordinates.coords.latitude, coordinates.coords.longitude]}
        icon={locationIcon}
      />
    </MapContainer>
  );
};

export default Map;
