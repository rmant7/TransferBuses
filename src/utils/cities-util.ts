import cities from "./cities.json";

type City = {
  ID: string;
  name: string;
  country_id: string;
  latitude: string;
  longitude: string;
  name_ru: string;
};

export function getCities(): City[] {
  return cities;
}

export function getCityById(id: string): City | undefined {
  return cities.find((city) => city.ID === id);
}

export function getCityByName(name: string): City | undefined {
  return cities.find((city) => city.name === name || city.name_ru === name);
}
