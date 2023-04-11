import OtherPlaces from "./OtherPlaces";
import PlaceDescription from "./PlaceDescription";
import SearchPlace from "./SearchPlace";

import classes from "./BudgetTravelTips.module.css";

const BudgetTravelTips = () => {
  return (
    <section className={classes.main_section}>
      <SearchPlace />
      <PlaceDescription />
      <OtherPlaces />
    </section>
  );
};

export default BudgetTravelTips;
