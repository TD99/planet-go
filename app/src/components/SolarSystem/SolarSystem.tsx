import { Circle } from "react-leaflet";
import { getSolarSystemData } from "@src/lib/solarSystem";
import { useEffect, useState } from "react";
import { getPlanetPositions, kmToLatLong } from "@src/core/solarSystem";

interface Planet {
  name: string;
  orbitRadius: number;
  angle: number;
  radius: number;
}

const orbitRadiusScale = 1e-9;
const meanRadiusScale = 1e6;
const sunMeanRadiusScale = 5e4;

interface SolarSystemProps {
  solarSystemCenter: [number, number];
}

const SolarSystem: React.FC<SolarSystemProps> = ({ solarSystemCenter }) => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [sun, setSun] = useState<Planet>();

  useEffect(() => {
    async function fetchPlanets() {
      const data = await getSolarSystemData();
      const planetPositions = getPlanetPositions(new Date(2022, 2, 1), data);
      const planetsData = data.bodies.filter((body: any) => body.isPlanet);
      const planets = planetsData.map((planet: any) => ({
        name: planet.englishName,
        orbitRadius: planet.semimajorAxis,
        angle:
          (planetPositions.filter((p) => p.name === planet.englishName)[0]
            .theta *
            180) /
          Math.PI,
        radius: planet.meanRadius * meanRadiusScale,
      }));
      setPlanets(planets);

      let newSun = data.bodies.find((body: any) => body.englishName === "Sun");
      console.log(newSun);
      newSun = {
        name: newSun.englishName,
        orbitRadius: newSun.semimajorAxis,
        angle: 0,
        radius: newSun.meanRadius * sunMeanRadiusScale,
      };
      console.log(newSun);
      setSun(newSun);
    }
    fetchPlanets();
  }, []);

  return (
    <>
      {planets.map((planet) => {
        // calculate x and y coordinates of planet based on its orbit radius and angle
        let x = planet.orbitRadius * Math.cos(planet.angle) * orbitRadiusScale;
        let y = planet.orbitRadius * Math.sin(planet.angle) * orbitRadiusScale;

        x = solarSystemCenter[0] + kmToLatLong(x, solarSystemCenter[0]).lat;
        y = solarSystemCenter[1] + kmToLatLong(y, solarSystemCenter[0]).long;

        return (
          <>
            {/* Orbit */}
            <Circle
              center={solarSystemCenter}
              radius={planet.orbitRadius * orbitRadiusScale * 1000}
              fillOpacity={0}
              color="red"
              weight={2}
            />

            {/* Planet */}
            <Circle
              center={[x, y]}
              radius={planet.radius * orbitRadiusScale}
              fillOpacity={1}
              eventHandlers={{
                click: () => {
                  console.log(planet.name);
                },
              }}
            />
          </>
        );
      })}

      {/* Sun */}
      {sun && (
        <Circle
          center={solarSystemCenter}
          radius={sun.radius * orbitRadiusScale}
          fillOpacity={1}
          color="yellow"
          eventHandlers={{
            click: () => {
              console.log(sun.name);
            },
          }}
        />
      )}
    </>
  );
};

export default SolarSystem;
