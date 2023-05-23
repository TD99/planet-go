const API_URL: string = "https://api.le-systeme-solaire.net/rest/bodies/";

export async function getSolarSystemData() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  const data = await response.json();
  return data;
}

export async function getSolarSystemPlanet(id: string) {
  const planetUrl = `${API_URL}${id}`;
  const response = await fetch(planetUrl);

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data;

}