import { Circle, ImageOverlay, LayerGroup, useMap } from "react-leaflet";
import { getSolarSystemData } from "@src/lib/solarSystem";
import { useEffect, useState } from "react";
import { getPlanetPositions, kmToLatLong } from "@src/core/solarSystem";
import { planetsData as planetsBaseData } from "@src/data/planetData";
import { Icon, LatLngBoundsExpression } from "leaflet";
import getNetworkTime from "@src/lib/time";
import useLocalStorage from "@src/hooks/useLocalStorage";

const orbitRadiusScale = (x: number) => {
  const root = 2;
  const scaleFactor = 3e-5;
  return Math.pow(x, 1 / root) * scaleFactor;
};

const planetRadiusScale = (x: number) => {
  const root = 2;
  const scaleFactor = 3e-4;
  return Math.pow(x, 1 / root) * scaleFactor;
};

interface Planet {
  name: string;
  orbitRadius: number;
  angle: number;
  radius: number;
  img?: string;
}

interface SolarSystemProps {
  solarSystemCenter: [number, number];
  userLocation: [number, number];
}

const SolarSystem: React.FC<SolarSystemProps> = ({
  solarSystemCenter,
  userLocation,
}) => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [time, setTime] = useLocalStorage<Date>("time", new Date());

  useEffect(() => {
    setTime(new Date(2023, 12, 4));
    const interval = setInterval(async () => {
      setTime((date: Date) => {
        let newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    planets.forEach((planet) => {
      let x = planet.orbitRadius * Math.cos(planet.angle);
      let y = planet.orbitRadius * Math.sin(planet.angle);

      x = solarSystemCenter[0] + kmToLatLong(x, solarSystemCenter[0]).lat;
      y = solarSystemCenter[1] + kmToLatLong(y, solarSystemCenter[0]).long;

      const distance = Math.sqrt(
        Math.pow(userLocation[0] - x, 2) + Math.pow(userLocation[1] - y, 2)
      );

      if (distance <= planet.radius) {
        handleUserOnPlanet(planet);
      }
    });
  }, [userLocation]);

  useEffect(() => {
    if (!time) return;
    fetchPlanets();
  }, [time]);

  async function fetchPlanets() {
    const data = await getSolarSystemData();
    let planetsData = planetsBaseData.map((planet: any) => ({
      ...planet,
      ...data.bodies.find((p: any) => p.englishName === planet.englishName),
    }));
    const planetPositions = getPlanetPositions(time, planetsData);
    const newPlanets = planetsData.map((planet: any) => {
      const angle =
        (planetPositions.filter((p) => p.name === planet.englishName)[0].theta *
          180) /
        Math.PI;

      return {
        name: planet.englishName,
        orbitRadius: orbitRadiusScale(planet.semimajorAxis),
        angle: angle,
        radius: planetRadiusScale(planet.meanRadius),
        img: planet.img,
      };
    });
    setPlanets(newPlanets);
  }

  const handlePlanetClick = (planet: Planet) => {
    console.log(planet);
  };

  const handleUserOnPlanet = (planet: Planet) => {
    console.log("handleUserOnPlanet", planet.name);
  };

  return (
    <LayerGroup>
      {planets.map((planet) => {
        return (
          <>
            {/* Orbit */}
            {planet.name !== "Sun" && (
              <Circle
                center={solarSystemCenter}
                radius={planet.orbitRadius * 1000}
                fillOpacity={0}
                color="black"
                weight={1}
              />
            )}
          </>
        );
      })}

      {planets.map((planet) => {
        // calculate x and y coordinates of planet based on its orbit radius and angle
        let x = planet.orbitRadius * Math.cos(planet.angle);
        let y = planet.orbitRadius * Math.sin(planet.angle);

        x = solarSystemCenter[0] + kmToLatLong(x, solarSystemCenter[0]).lat;
        y = solarSystemCenter[1] + kmToLatLong(y, solarSystemCenter[0]).long;

        const bounds: LatLngBoundsExpression = [
          [
            x - kmToLatLong(planet.radius, solarSystemCenter[0]).lat,
            y - kmToLatLong(planet.radius, solarSystemCenter[0]).long,
          ],
          [
            x + kmToLatLong(planet.radius, solarSystemCenter[0]).lat,
            y + kmToLatLong(planet.radius, solarSystemCenter[0]).long,
          ],
        ];

        return (
          <>
            {/* Planet */}
            {planet.img ? (
              <ImageOverlay
                className="planet"
                url={`/planets/${planet.img}`}
                bounds={bounds}
                interactive={true}
                eventHandlers={{
                  click: () => {
                    handlePlanetClick(planet);
                  },
                }}
                zIndex={1000}
              />
            ) : (
              <Circle
                center={[x, y]}
                radius={planet.radius * 1000}
                fillOpacity={1}
                eventHandlers={{
                  click: () => {
                    handlePlanetClick(planet);
                  },
                }}
              />
            )}
          </>
        );
      })}
    </LayerGroup>
  );
};

export default SolarSystem;
