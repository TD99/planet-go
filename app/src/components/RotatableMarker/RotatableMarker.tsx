import { divIcon } from "leaflet";
import { Marker } from "react-leaflet";
import { LatLngExpression, PointExpression } from "leaflet";

interface RotatableMarkerProps {
  position: LatLngExpression;
  rotation: number;
  icon: string;
  iconSize: PointExpression;
  iconAnchor: PointExpression;
}

const RotatableMarker: React.FC<RotatableMarkerProps> = ({
  position,
  rotation,
  icon,
  iconSize,
  iconAnchor,
}) => {
  const markerIcon = divIcon({
    className: "custom-marker-icon",
    html: `<img src="${icon}" style="transform: rotate(${rotation}deg); width: ${iconSize[0]}px; height: ${iconSize[1]}px;" />`,
    iconSize,
    iconAnchor,
  });

  return <Marker position={position} icon={markerIcon} />;
};

export default RotatableMarker;
