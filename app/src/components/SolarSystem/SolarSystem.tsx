import { Circle, ImageOverlay, LayerGroup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { getPlanetPositions, kmToLatLong } from "@src/core/solarSystem";
import { planetsData } from "@src/data/planetData";
import { Icon, LatLngBoundsExpression } from "leaflet";
import { arrowUp } from "ionicons/icons";
import getNetworkTime from "@src/lib/time";
import useLocalStorage from "@src/hooks/useLocalStorage";
import { AppSettings } from "@src/types/interfaces";
import { useHistory } from "react-router";
import { IonIcon } from "@ionic/react";

interface Planet {
  name: string;
  orbitRadius: number;
  angle: number;
  radius: number;
  img?: string;
  x?: number;
  y?: number;
  distance?: number;
}

interface SolarSystemProps {
  solarSystemCenter: [number, number];
  userLocation: [number, number];
}

const SolarSystem: React.FC<SolarSystemProps> = ({
  solarSystemCenter,
  userLocation,
}) => {
  const history = useHistory();
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [time, setTime] = useLocalStorage<Date>("time", new Date());
  const [settings, setSettings] = useLocalStorage<AppSettings>("settings", {});
  const [arrowRotation, setArrowRotation] = useState<number>(0);
  const [nearestPlanet, setNearestPlanet] = useState<Planet | null>(null);

  useEffect(() => {
    setTime(new Date(2025 + 40, 1, 1));
    const interval = setInterval(async () => {
      setTime((date: Date) => {
        let newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 365.25 * 0.8);
        return newDate;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    planets.forEach((planet) => {
      const { x, y } = calculatePlanetXY(planet);

      const distance = Math.hypot(userLocation[0] - x, userLocation[1] - y);

      if (distance <= kmToLatLong(planet.radius, solarSystemCenter[0]).lat) {
        handleUserOnPlanet(planet);
      }
    });
    const newNearestPlanet = getNearestPlanet();
    setNearestPlanet(newNearestPlanet);
    setArrowRotation(getArrowRotation(newNearestPlanet));
  }, [userLocation, time]);

  useEffect(() => {
    if (!time) return;
    fetchPlanets();
  }, [time]);

  const orbitRadiusScale = (x: number) => {
    const root = 2;
    const scaleFactor =
      settings.scale !== undefined ? settings.scale * 0.005 : 3e-5;
    return Math.pow(x, 1 / root) * scaleFactor;
  };

  const planetRadiusScale = (x: number) => {
    const root = 3;
    const scaleFactor =
      settings.scale !== undefined ? settings.scale * 0.4 : 2e-3;
    return Math.pow(x, 1 / root) * scaleFactor;
  };

  async function fetchPlanets() {
    console.log(planetsData.length);
    const planetPositions = getPlanetPositions(time, planetsData);
    const newPlanets = planetsData.map((planet: any) => {
      const angle = planetPositions.filter(
        (p) => p.name === planet.englishName
      )[0].theta;

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
    console.log(`/game/planet/${planet.name.toLowerCase()}`);
    history.push(`/game/planet/${planet.name.toLowerCase()}`);
  };

  const handleUserOnPlanet = (planet: Planet) => {
    console.log("handleUserOnPlanet", planet.name);
  };

  const calculatePlanetXY = (planet: Planet) => {
    let x = planet.orbitRadius * Math.cos(planet.angle);
    let y = planet.orbitRadius * Math.sin(planet.angle);
    x = solarSystemCenter[0] + kmToLatLong(x, solarSystemCenter[0]).lat;
    y = solarSystemCenter[1] + kmToLatLong(y, solarSystemCenter[0]).long;
    return { x, y };
  };

  const getNearestPlanet = () =>
    planets.reduce(
      (prev: any, curr) => {
        const { x, y } = calculatePlanetXY(curr);

        const distance = Math.hypot(userLocation[0] - x, userLocation[1] - y);
        return distance < prev.distance ? { ...curr, distance, x, y } : prev;
      },
      { distance: Infinity }
    );

  const getArrowRotation = (planet: any) => {
    const dx = userLocation[0] - planet.x;
    const dy = userLocation[1] - planet.y;
    const angle = Math.atan2(dy, dx);
    return (angle * 180) / Math.PI + 180;
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
                url={`./planets/${planet.img}`}
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
      <div className="map-arrow-container">
        <div
          className="map-arrow"
          style={{
            transform: `translateX(-50%) translateY(-25%) rotate(${arrowRotation}deg)`,
          }}
        >
          <IonIcon icon={arrowUp} className="icon" />
        </div>
        <div className="circle-container">
          <img src={`/planets/${nearestPlanet?.img}`} alt="" />
        </div>
      </div>
    </LayerGroup>
  );
};

export default SolarSystem;
