import React from 'react';
import cities_json from '../../data/cities-fullList.json';
import styles from './CitiesComponent.module.css'
import {Link} from "react-router-dom";
import {TRAVEL_TIPS_DESCRIPTION} from "../../../trip_search/domain/entites/utils/constants/constants";

const Cities = () => {
    const sortCities = cities_json.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        }
        return 0;
    })
    const goToCity = (path) => {
        //useNavigate(path)
    }
    return (
        <div>
            <hr className={styles.ruler}/>
            <div className={styles.cityHeader}>Choose a city</div>
            <hr className={styles.ruler}/>
            <div>
                <ul className={styles.cityList}>
                    {sortCities.map((item, key) => (
                        <li className={styles.list} key={key}>
                            {/*<Link to={`${TRAVEL_TIPS_DESCRIPTION}/${item.name}`}>*/}
                            {/*    {item.name}*/}
                            {/*</Link>*/}
                            <Link to={TRAVEL_TIPS_DESCRIPTION}>
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
export default Cities;