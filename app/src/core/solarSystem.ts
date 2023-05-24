interface PlanetData {
  name: string;
  position: {
    x: number;
    y: number;
  };
  theta: number;
}

interface Body {
  isPlanet: boolean;
  semimajorAxis: number;
  eccentricity: number;
  sideralOrbit: number;
  englishName: string;
}

export function getPlanetPositions(time: Date, data: Body[]): PlanetData[] {
  const referencePerihelionTimes: any = {
    Mercury: new Date(2022, 2, 1),
    Venus: new Date(2022, 0, 9),
    Earth: new Date(2022, 0, 4),
    Mars: new Date(2023, 7, 20),
    Jupiter: new Date(2023, 8, 26),
    Saturn: new Date(2024, 4, 21),
    Uranus: new Date(2050, 3, 17),
    Neptune: new Date(2042, 6, 3),
  };

  const anomalisticPeriods: any = {
    Mercury: 87.9691,
    Venus: 224.701,
    Earth: 365.259636,
    Mars: 686.98,
    Jupiter: 4332.589,
    Saturn: 10759.22,
    Uranus: 30685.4,
    Neptune: 60189,
  };

  function kepler(eccentricity: number, meanAnomaly: number): number {
    let E = meanAnomaly;
    while (true) {
      let deltaE =
        (E - eccentricity * Math.sin(E) - meanAnomaly) /
        (1 - eccentricity * Math.cos(E));
      E -= deltaE;
      if (Math.abs(deltaE) < 1e-6) {
        break;
      }
    }
    return E;
  }

  function trueAnomaly(eccentricity: number, eccentricAnomaly: number): number {
    let x =
      (Math.sqrt(1 - eccentricity ** 2) * Math.sin(eccentricAnomaly)) /
      (1 - eccentricity * Math.cos(eccentricAnomaly));
    let y =
      (Math.cos(eccentricAnomaly) - eccentricity) /
      (1 - eccentricity * Math.cos(eccentricAnomaly));
    return Math.atan2(x, y);
  }

  function calculatePerihelionTimes(
    referencePerihelionTime: Date,
    anomalisticPeriod: number,
    date: Date
  ): Date {
    let timeSinceReferencePerihelion =
      date.getTime() - referencePerihelionTime.getTime();
    let anomalisticPeriodsSinceReferencePerihelion =
      timeSinceReferencePerihelion / (anomalisticPeriod * 24 * 3600 * 1000);
    let perihelionNumber = Math.round(
      anomalisticPeriodsSinceReferencePerihelion
    );
    let perihelionTime = new Date(
      referencePerihelionTime.getTime() +
        perihelionNumber * anomalisticPeriod * 24 * 3600 * 1000
    );
    return perihelionTime;
  }

  let planetData = [];
  for (let body of data) {
    if (body.isPlanet) {
      let semimajorAxis = body.semimajorAxis; // in km
      let eccentricity = body.eccentricity;
      let orbitalPeriod = body.sideralOrbit; // in days

      let meanMotion = (2 * Math.PI) / orbitalPeriod;
      let referencePerihelionTime = referencePerihelionTimes[body.englishName];
      let anomalisticPeriod = anomalisticPeriods[body.englishName];
      let perihelionTime = calculatePerihelionTimes(
        referencePerihelionTime,
        anomalisticPeriod,
        time
      );
      let timeSincePerihelion =
        (time.getTime() - perihelionTime.getTime()) / (24 * 3600 * 1000); // in days
      let meanAnomaly = meanMotion * timeSincePerihelion;

      let eccentricAnomaly = kepler(eccentricity, meanAnomaly);
      let theta = trueAnomaly(eccentricity, eccentricAnomaly);

      let x = semimajorAxis * (Math.cos(eccentricAnomaly) - eccentricity);
      let y =
        semimajorAxis *
        Math.sqrt(1 - eccentricity ** 2) *
        Math.sin(eccentricAnomaly);
      planetData.push({ name: body.englishName, position: { x, y }, theta });
    } else {
      planetData.push({
        name: body.englishName,
        position: { x: 0, y: 0 },
        theta: 0,
      });
    }
  }

  return planetData;
}

export function kmToLatLong(km: number, lat: number) {
  const earthRadius = 6371; // Earth's radius in km
  const deltaLat = (km / earthRadius) * (180 / Math.PI);
  const deltaLong = km / (111.32 * Math.cos((lat * Math.PI) / 180));
  return { lat: deltaLat, long: deltaLong };
}
