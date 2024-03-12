import React from 'react';
import css from "../Styles/TrevelTipsCSS.css"
import cities_json from "../../../modules/trip_search/domain/entites/utils/jsons/cities-full list.json"
const Cities = () => {
    const sortCities = cities_json.sort((a,b)=>{
        if(a.name.toLowerCase()<b.name.toLowerCase()){
            return-1
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        }
        return 0;
    })
    const goToCity=(path)=>{
        //useNavigate(path)
    }
    return (
        <div className={css.cities}>
            <hr className={css.hr}/>
            <div className={css.cityHeader}>Cities</div>
            <hr className={css.hr}/>
            <ul className={css.cityList}>
            {sortCities.map((item,key)=>{
                return <li className={css.list} key={key} onClick={goToCity(item.id)}>
                    {item.name}</li>
            })}
        </ul>
        </div>
    );
};
export default Cities;