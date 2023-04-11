import { Link, useLocation } from "react-router-dom";

import cities from "../../utils/cities-tips.json";
import countries from "../../utils/countries-tips.json";

const PlaceDescription = () => {
  const location = useLocation();
  const queryParamsObj = new URLSearchParams(location.search);
  const searchedCity = queryParamsObj.get("city");
  const searchedCountry = queryParamsObj.get("country");

  //will set it via useeffect probably
  const neededPlace = searchedCity
    ? cities.find((city) => city.id === Number(searchedCity))
    : countries.find((country) => country.id === Number(searchedCountry));
  console.log(neededPlace);

  return (
    <main>
      <div>
        <p>imgs container here</p>
      </div>
      <div>
        <h2>{neededPlace.name}</h2>
        <div>translation box</div>
      </div>
      <div>
        <h2>Description</h2>
        <p>{neededPlace.description}</p>
      </div>
      <div>
        <h2>Fun facts</h2>
        <ul>
          <li>{neededPlace.facts}</li>
        </ul>
      </div>
      <Link to="/"> Find routes </Link>
    </main>
  );
};
export default PlaceDescription;
