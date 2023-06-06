interface PlanetData {
  name: string;
  theta: number;
}

interface Body {
  semimajorAxis: number;
  eccentricity: number;
  sideralOrbit: number;
  englishName: string;
  referencePerihelionTime: Date;
  anomalisticPeriod: number;
}

export function getPlanetPositions(time: Date, data: Body[]): PlanetData[] {
  function calculatePerihelionTimes(
    referencePerihelionTime: Date,
    anomalisticPeriod: number,
    date: Date
  ): Date {
    let timeSinceReferencePerihelion =
      date.getTime() - referencePerihelionTime.getTime();
    let anomalisticPeriodsSinceReferencePerihelion =
      timeSinceReferencePerihelion / (anomalisticPeriod * 24 * 3600 * 1000);
    let perihelionNumber = Math.floor(
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
      let orbitalPeriod = body.sideralOrbit; // in days
      let meanMotion = (2 * Math.PI) / orbitalPeriod;
      let referencePerihelionTime = body.referencePerihelionTime;
      let perihelionTime = calculatePerihelionTimes(
        referencePerihelionTime,
        orbitalPeriod,
        time
      );
      let timeSincePerihelion =
        (time.getTime() - perihelionTime.getTime()) / (24 * 3600 * 1000); // in days
      let theta = meanMotion * timeSincePerihelion;
      console.log(body);

      planetData.push({ name: body.englishName, theta });
    } else {
      planetData.push({
        name: body.englishName,
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
