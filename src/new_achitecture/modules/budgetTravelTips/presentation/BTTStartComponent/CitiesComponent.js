import React from 'react';
import cities_json from "./cities-fullList.json"

const Cities = () => {
    const sortCities=cities_json.sort((a,b)=>{
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
        <div className={"cities"}>
            <hr className={"hr"}/>
            <div className={"cityHeader"}>Cities</div>
            <hr className={"hr"}/>
            <ul className={"cityList"}>
                {sortCities.map((item,key)=>{
                    return <li className={"list"} key={key} onClick={goToCity(item.id)}>
                        {item.name}</li>
                })}
            </ul>
        </div>
    );
};
export default Cities;