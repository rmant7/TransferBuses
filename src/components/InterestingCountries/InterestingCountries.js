import CountryCard from "./CountryCard";
import classes from "./InterestingCountries.module.css";
import countries from "../../utils/countries-tips.json";

const InterestingCountries = () => {
  return (
    <section className={classes.section__interesting}>
      <h2 className={classes.header}>The most popular countries</h2>
      <div className={classes.list}>
        {countries.map((country) => (
          <CountryCard country={country} key={country.id} />
        ))}
      </div>
    </section>
  );
};

export default InterestingCountries;
