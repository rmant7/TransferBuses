import CityCard from "./CityCard";
import classes from "./InterestingCities.module.css";
import cities from "../../utils/cities-tips.json";

const InterestingCities = () => {
  return (
    <section className={classes.section__interesting}>
      <h2 className={classes.header}>Read more about interesting places</h2>
      <div className={classes.list}>
        {cities.map((city) => (
          <CityCard city={city} key={city.id} />
        ))}
      </div>
    </section>
  );
};

export default InterestingCities;
