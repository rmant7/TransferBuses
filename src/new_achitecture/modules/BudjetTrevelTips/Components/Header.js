import React from 'react';
import css from "../Styles/TrevelTipsCSS.css"
const Header = () => {
    return (
        <div className={css.header}>
            <div className={css.slogan}>CheapTrip</div>
            <div className={css.slogan}>Pay less, visit more!</div>
        </div>
    );
};

export default Header;