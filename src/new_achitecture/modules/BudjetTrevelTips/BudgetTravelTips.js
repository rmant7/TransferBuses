import React from 'react';
import Header from "./Components/Header";
import NavButtons from "./Components/NavButtons";
import Gallery from "./Components/Gallery";
import TitlebarImageList from "./Components/GalleryMUI";
import Cities from "./Components/Cities";
import css from "./Styles/TrevelTipsCSS.css"

const BudgetTravelTips = () => {
    return (
        <div className={css.advPage}>
            <div style={{height: '100px'}}></div>
            <Gallery/>
            <TitlebarImageList/>
            <Cities/>
        </div>
    );
};
export default BudgetTravelTips;