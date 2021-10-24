import cities from './cities.json';

export function getCities() {
    return cities;
}

export function getCityById(id) {
    return cities.find(city => city.ID === id);
}

export function getCityByName(name) {
    return cities.find(city => city.name === name);
}

export function getCityByNameRu(name) {
    return cities.find(city => city.name_ru === name);
}