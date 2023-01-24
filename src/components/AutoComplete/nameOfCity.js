export const nameOfCity = (city) => {
    const nameOfCityArr = city.properties.display_name.split(",");
    if (nameOfCityArr.length > 2) {
      return {
        city: nameOfCityArr[0],
        country: nameOfCityArr[nameOfCityArr.length - 1],
        county: nameOfCityArr[1],
        geometry: city.geometry.coordinates,
        id: city.properties.osm_id,
      };
    }
    return {
      city: nameOfCityArr[0],
      country: nameOfCityArr[nameOfCityArr.length - 1],
      county: null,
      geometry: city.geometry.coordinates,
      id: city.properties.osm_id,
    };
  };