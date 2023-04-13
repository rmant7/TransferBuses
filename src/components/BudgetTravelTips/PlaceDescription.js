import { Link, useLocation } from "react-router-dom";

import cities from "../../utils/cities-tips.json";
import countries from "../../utils/countries-tips.json";
import Slider from "./Slider";
import TranslationBox from "./TranslationBox";
import classes from "./BudgetTravelTips.module.css";

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

  const images = neededPlace.imgs.map((img) =>
    require(`../../assets/city-pictures/${img}`)
  );

  return (
    <main>
      <div>
        <Slider imgs={images} />
      </div>
      <div className={classes.info}>
        <div className={classes.title_box}>
          <h2>{neededPlace.name}</h2>
          <TranslationBox />
        </div>
        <div className={classes.description}>
          <h2>Description</h2>
          <p>{neededPlace.description}</p>
          <h2>Fun facts</h2>
          <p>{neededPlace.facts}</p>
        </div>
      </div>
      <div className={classes.cta_box}>
        <Link to="/" className={classes.cta}>
          Find routes
        </Link>
      </div>
    </main>
  );
};
export default PlaceDescription;

/// города внизу
/// реализовать серч
// десктопные стили
