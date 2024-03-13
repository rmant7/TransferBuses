import React from 'react';
import FindBudget from "../presentation/ButtonsComponent/Find&Budget";
import {TRAVEL_TIPS_DESCRIPTION} from "../../trip_search/domain/entites/utils/constants/constants";
import Gallery from "../presentation/BTTStartComponent/GalleryComponent";
import TitlebarImageList from "../presentation/BTTStartComponent/GalleryMUIComponent";
import Cities from "../presentation/BTTStartComponent/CitiesComponent";

const BudgetTravelTipsStartPage = () => {
    return (
        <div>
            <FindBudget/>
            <Gallery/>
            {/*<TitlebarImageList/>*/}
            <a href={TRAVEL_TIPS_DESCRIPTION}> city1 </a>
            <Cities/>
        </div>
    );
};

export default BudgetTravelTipsStartPage;