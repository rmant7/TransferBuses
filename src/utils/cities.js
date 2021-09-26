import cities from './cities.json';

export function getCities() {
    return cities;
}

export function getCityById(id) {
    return cities.find(city => city.ID === id);
}

export function getCityByName(name, language) {
    return cities.find(city => language === "ru" ? city.name_ru === name : city.name === name);
}