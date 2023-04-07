const PING_LIMIT = 300;

export const asyncAutocomplete = async (e, setState, options, geoLocation) => {
  const p = await ping();
  // check ping
  try {
    if (p <= PING_LIMIT) {
      const value = e.target.value;
      let data = await findAutocomplete(value);
      // create array with needs fields
      let array = data.map((item) => ({
        label: item.properties.name,
        key: options.find((el) => el.label.includes(item.properties.name))?.key || "-10",
        latitude: item.geometry.coordinates[1],
        longitude: item.geometry.coordinates[0],
      }));
      for (let i = 0; i < array.length; i++) {
        let distance = getDistanceFromLatLonInKm(
          parseInt(geoLocation.latitude),
          parseInt(geoLocation.longitude),
          array[i].latitude,
          array[i].longitude
        );
        array[i].distance = distance;
      }
      //  sort array by distance
      array = array.sort(function (a, b) {
        return a.distance - b.distance;
      });
      //  get array unique elements
      const uniqueArray = [...new Map(array.map((item) => [item["label"], item])).values()];
      setState(uniqueArray);
    } else {
      setState([]);
    }
  } catch (error) {
    setState([]);
  }
};
// function to get distance between points
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d; // distance returned
}
function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
//  get array ellemen by input value
const findAutocomplete = async (cityName) => {
  ///****active after change input********* */
  const url = `https://photon.komoot.io/api/?q=${cityName}&osm_tag=place:city`;
  const response = await fetch(url);
  let data = (await response.json()).features;
  return data;
};

// function to check ping
const ping = async () => {
  const start = Date.now();
  await fetch("photon.komoot.io/api");
  const end = Date.now();
  return end - start;
};
