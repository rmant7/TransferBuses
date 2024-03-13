import React from 'react';
import cities_json from "./cities-fullList.json";
import styles from './CitiesComponent.module.css'

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
                    {sortCities.map((item, key) => {
                        return <li className={styles.list} key={key} onClick={goToCity(item.id)}>
                            {item.name}</li>
                    })}
                </ul>
            </div>
        </div>
    );
};
export default Cities;