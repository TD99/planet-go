import { Circle } from "react-leaflet";
import { getSolarSystemData } from "@src/lib/solarSystem";
import { useEffect, useState } from "react";

function kmToLatLong(km: number, lat: number) {
  const earthRadius = 6371; // Earth's radius in km
  const deltaLat = (km / earthRadius) * (180 / Math.PI);
  const deltaLong = km / (111.32 * Math.cos((lat * Math.PI) / 180));
  return { lat: deltaLat, long: deltaLong };
}
interface Planet {
  name: string;
  orbitRadius: number;
  angle: number;
  radius: number;
}

interface SolarSystemProps {
  solarSystemCenter: [number, number];
  scale: number;
}

const SolarSystem: React.FC<SolarSystemProps> = ({
  solarSystemCenter,
  scale,
}) => {
  const [planets, setPlanets] = useState<Planet[]>([]);

  useEffect(() => {
    async function fetchPlanets() {
      const data = await getSolarSystemData();
      const planetsData = data.bodies.filter((body: any) => body.isPlanet);
      const planets = planetsData.map((planet: any) => ({
        name: planet.englishName,
        orbitRadius: planet.semimajorAxis,
        angle: 0, // TODO: calculate real angle
        radius: planet.meanRadius * 1e6,
      }));
      setPlanets(planets);
    }
    fetchPlanets();
  }, []);

  return (
    <>
      {planets.map((planet) => {
        // calculate x and y coordinates of planet based on its orbit radius and angle
        let x = planet.orbitRadius * Math.cos(planet.angle) * scale;
        let y = planet.orbitRadius * Math.sin(planet.angle) * scale;

        x = solarSystemCenter[0] + kmToLatLong(x, solarSystemCenter[0]).lat;
        y = solarSystemCenter[1] + kmToLatLong(y, solarSystemCenter[0]).long;

        return (
          <>
            {/* Orbit */}
            <Circle
              center={solarSystemCenter}
              radius={planet.orbitRadius * scale * 1000}
              fillOpacity={0}
              color="red"
              weight={2}
            />

            {/* Planet */}
            <Circle
              center={[x, y]}
              radius={planet.radius * scale}
              fillOpacity={1}
            />
          </>
        );
      })}
    </>
  );
};

export default SolarSystem;
