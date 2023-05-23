const API_URL: string = "https://api.le-systeme-solaire.net/rest/bodies/";

export async function getSolarSystemData() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    return Promise.reject(response.statusText);
  }

  const data = await response.json();
  return data;
}
