import React, {useCallback, useState} from "react";
import {Container} from "@material-ui/core";
import filtersClasses from "../../../../../modules/trip_search/lib/filterSearch/Filter/FilterComponent.module.css";

import css from "./MainPageComponent.module.css";
import Logo_Cht from "./Logo_ChT_2.png";
import {AutoCompleteSection} from "../../../../trip_search/lib/autoComplete/AutoCompleteSection";
import CheapTripSearch from "../../../../trip_search/domain/entites/CheapTripSearch/CheapTripSearch";
import {Link} from "react-router-dom";

export const MainPageComponent = () => {

    const [isSearchListOpen, setIsSearchListOpen] = useState(false);

    const SloganMain = useCallback(() => (
        <div className={css.MainSlogan}>
            Find most beneficial and unusual routes between cities, combining flight,
            train, bus, ferry and rideshare.
        </div>
    ), []);

  return (
    <Container maxWidth="xl" className={css.tb_padding}>

      {SloganMain()}
      <div className={filtersClasses.filters_sector}>
          <CheapTripSearch setIsSearchListIsOpen={setIsSearchListOpen}/>
      </div>

        {isSearchListOpen === false ? (
            <div className={css.Logo_Cht_Wrapper}>
                <img className={css.Logo_Cht} src={Logo_Cht} alt="CheapTrip Logo"/>
            </div>
        ) : null }
        </Container>
    );
};
