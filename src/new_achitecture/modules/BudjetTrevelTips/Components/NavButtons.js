import React from 'react';
import css from "../Styles/TrevelTipsCSS.css";
const NavButtons = () => {

    const findCheapestRoutes=()=>{
        //useNavigate()
    }

    return (
        <div className={css.navButtons}>
            <button className={css.navClick1} onClick={findCheapestRoutes}>Find cheapest routes</button>
            <button className={css.navClick2}>Budget travel tips</button>
        </div>
    );
};

export default NavButtons;