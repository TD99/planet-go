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
  referencePerihelionTime: Date;
  anomalisticPeriod: number;
}

export function getPlanetPositions(time: Date, data: Body[]): PlanetData[] {
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
    if (body.englishName !== "Sun") {
      let semimajorAxis = body.semimajorAxis; // in km
      let eccentricity = body.eccentricity;
      let orbitalPeriod = body.sideralOrbit; // in days

      let meanMotion = (2 * Math.PI) / orbitalPeriod;
      let referencePerihelionTime = body.referencePerihelionTime;
      let anomalisticPeriod = body.anomalisticPeriod;
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
