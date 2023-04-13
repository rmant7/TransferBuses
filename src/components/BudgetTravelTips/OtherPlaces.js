import CityCard from "../InterestingCities/CityCard";
import cities from "../../utils/cities-tips.json";
import classes from "./BudgetTravelTips.module.css";

const OtherPlaces = () => {
  return (
    <div className={classes.other}>
      <h2>Also check this</h2>
      <div className={classes.city_list}>
        {cities.slice(0, 2).map((city) => (
          <CityCard city={city} key={city.id} />
        ))}
      </div>
    </div>
  );
};
export default OtherPlaces;
