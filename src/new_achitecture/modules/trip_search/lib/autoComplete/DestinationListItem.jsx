import React from 'react';
import style from './RoutesList.module.css'
import {AiFillCaretDown} from "react-icons/ai";
import {IconContext} from "react-icons";
import SearchResultItem from "../../presentation/components/searchResult/SearchResultItem";
import SearchResultView from "../../presentation/components/searchResult/SearchResultView";

function DestinationListItem({item, onClick}) {
    return (
        <SearchResultView>
            <SearchResultItem item={item} from={item.from} to={item.to}
                              data={{transportation_type: 'plane'}}
                              time={item.time} price={item.euro_price} />
            {/*<li onClick={(e) => onClick(e)}>*/}
            {/*    <h3>{item.city}</h3>*/}
            {/*    <p>{item.country}</p>*/}
            {/*    <p>{item.euro_price} EUR </p>*/}
            {/*    <button type="button">*/}
            {/*        <IconContext.Provider value={{color: "orange"}}>*/}
            {/*            <AiFillCaretDown/>*/}
            {/*        </IconContext.Provider>*/}
            {/*    </button>*/}
            {/*    {<p className={style.itemOfTheLittleTextOfCity}>{item.city}</p>}*/}
            {/*</li>*/}
        </SearchResultView>
    );
}

export default DestinationListItem;