import { Circle, ImageOverlay } from "react-leaflet";
import { getSolarSystemData } from "@src/lib/solarSystem";
import { useEffect, useState } from "react";
import { getPlanetPositions, kmToLatLong } from "@src/core/solarSystem";
import { planetsData as planetsData2 } from "@src/data/planetData";
import { Icon, LatLngBoundsExpression } from "leaflet";

const mergePlanetData = (a1: any[], a2: any[]) => {
  return a1.map((planet) => {
    const planet2 = a2.find((p) => p.englishName === planet.englishName);
    return { ...planet, ...planet2 };
  });
};

const orbitRadiusScale = (x: number) => {
  const root = 2;
  const scaleFactor = 3e-5;
  return Math.pow(x, 1 / root) * scaleFactor;
};

const planetRadiusScale = (x: number) => {
  const root = 2;
  const scaleFactor = 1.5e-4;
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
}

const SolarSystem: React.FC<SolarSystemProps> = ({ solarSystemCenter }) => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [sun, setSun] = useState<Planet>();

  useEffect(() => {
    async function fetchPlanets() {
      const data = await getSolarSystemData();
      const planetPositions = getPlanetPositions(new Date(2022, 2, 1), data);
      let planetsData = data.bodies.filter((body: any) => body.isPlanet);
      planetsData = mergePlanetData(planetsData, planetsData2);
      const planets = planetsData.map((planet: any) => ({
        name: planet.englishName,
        orbitRadius: orbitRadiusScale(planet.semimajorAxis),
        angle:
          (planetPositions.filter((p) => p.name === planet.englishName)[0]
            .theta *
            180) /
          Math.PI,
        radius: planetRadiusScale(planet.meanRadius),
      }));
      setPlanets(planets);

      let newSun = data.bodies.find((body: any) => body.englishName === "Sun");
      console.log(newSun);
      newSun = {
        name: newSun.englishName,
        orbitRadius: orbitRadiusScale(newSun.semimajorAxis),
        angle: 0,
        radius: planetRadiusScale(newSun.meanRadius),
        img: "sun.png",
      };
      console.log(newSun);
      setSun(newSun);
      setPlanets([...planets, newSun]);
    }
    fetchPlanets();
  }, []);

  return (
    <>
      {planets.map((planet) => {
        // calculate x and y coordinates of planet based on its orbit radius and angle
        let x = planet.orbitRadius * Math.cos(planet.angle);
        let y = planet.orbitRadius * Math.sin(planet.angle);

        x = solarSystemCenter[0] + kmToLatLong(x, solarSystemCenter[0]).lat;
        y = solarSystemCenter[1] + kmToLatLong(y, solarSystemCenter[0]).long;

        console.log(planet.name, planet.radius);
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
        console.log(planet.name, bounds);

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

            {/* Planet */}
            {planet.img ? (
              <ImageOverlay
                url={`/planets/${planet.img}`}
                bounds={bounds}
                eventHandlers={{
                  click: () => {
                    console.log(planet.name);
                  },
                }}
              />
            ) : (
              <Circle
                center={[x, y]}
                radius={planet.radius * 1000}
                fillOpacity={1}
                eventHandlers={{
                  click: () => {
                    console.log(planet.name);
                  },
                }}
              />
            )}
          </>
        );
      })}
    </>
  );
};

export default SolarSystem;
