import React from 'react';
import { Container } from "@material-ui/core";
import FiltersCitiesFrom from "../FiltersCitysFrom/FiltersCitiesFrom";
import filtersClasses from "../Filter/FilterComponent.module.css";
import css from "./MainPageComponent.module.css";
import Logo_Cht from "./Logo_ChT_2.png";

export const MainPageComponent = () => {

  const SloganMain = () => (
    <div className={css.MainSlogan}>
      Find most beneficial and unusual routes between cities,
      combining flight, train, bus, ferry and rideshare.
    </div>
  );

  return (
    <Container maxWidth="xl" className={css.tb_padding}>

      {SloganMain()}

      <div className={filtersClasses.filters_sector}>
        <FiltersCitiesFrom />
      </div>

      <div className={css.Logo_Cht_Wrapper}>
        <img
          className={css.Logo_Cht}
          src={Logo_Cht}
          alt="CheapTrip Logo"
        />
      </div>

    </Container>
  );
}





