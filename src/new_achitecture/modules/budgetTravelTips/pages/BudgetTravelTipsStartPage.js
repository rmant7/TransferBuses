import React from 'react';
import FindBudget from "../presentation/ButtonsComponent/Find&Budget";
import {TRAVEL_TIPS_DESCRIPTION} from "../../trip_search/domain/entites/utils/constants/constants";
import Gallery from "../presentation/BTTStartComponent/GalleryComponent";
import TitlebarImageList from "../presentation/BTTStartComponent/galleryMUI";
import Cities from "../presentation/BTTStartComponent/CitiesComponent";

const BudgetTravelTipsStartPage = () => {
    return (
        <div>
            <FindBudget/>
            <div>
                <h1>The most popular cities</h1>
                <p>Explore the most popular cities around the world and experience their unique charm and
                    attractions!</p>
                <p>GALLERY</p>
                <h3>Choose a city</h3>
                <p1>Cities (list)</p1> <br />
                <a href={TRAVEL_TIPS_DESCRIPTION}> city1 </a>
            </div>

            {/*<Gallery/>*/}
            {/*<TitlebarImageList/>*/}
            {/*<Cities/>*/}
        </div>
    );
};

export default BudgetTravelTipsStartPage;