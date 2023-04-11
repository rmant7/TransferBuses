import classes from "./BudgetTravelTips.module.css";

const SearchPlace = () => {
  return (
    <form className={classes.form}>
      <label htmlFor="city-search" className={classes.form__title}>
        Find a city
      </label>
      <input
        id="city-search"
        placeholder="Enter city name"
        className={classes.form__input}
      />
      <button type="submit" className={classes.form__button}>
        Search
      </button>
    </form>
  );
};
export default SearchPlace;

//city added to query string the page refreshes with this city || no city found
