// json with cities
// city-object includes key (a unique number) and value (info about this city)
// value includes city name, latitude and longitude
// ! lack of country name value

// locations.json

class Location {
    id;
    name;
    latitude;
    longitude;
    country_name; //should be added !
    constructor(id, name, latitude, longitude, country_name) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.country_name = country_name;
    }
}

// example
export let example = {
    "9":
        {
            "name": "Tashkent",
            "latitude": 41.29999923706055,
            "longitude": 69.2667007446289,
            // "country_name": "Uzbekistan"
        }
};

export let example2 = {
    "65": {
        "name": "Buenos Aires",
        "latitude": -34.599700927734375,
        "longitude": -58.381900787353516,
        // "country_name": "Argentina"
    }
};