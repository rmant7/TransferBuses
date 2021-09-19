import cities from './cities.json';

export function getCityById(id) {
    return cities.find(city => city.ID === id);
}