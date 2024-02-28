import React, {useState} from "react";
import DestinationListItem from "./DestinationListItem";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import SearchResultView from "../../presentation/components/searchResult/SearchResultView";

const RoutesList = ({list, cityFrom}) => {
    const [clicked, setClicked] = useState(false);
    const [id, setId] = useState('');

    const onClick = (event) => {
        if (id === "") {
            setId(event.target.id)
            setClicked(!clicked)
        } else {
            // console.log(id);
            setId('')
            setId(event.target.id);
            setClicked(!clicked)
        }
        // console.log(id)
    };

    return (
        <>
            {list.map(item => {
                const data = {
                    trip_duration: item.trip_duration,
                    euro_price: item.euro_price,
                }
                return (
                    <SearchResultView cityFrom={cityFrom} cityTo={item.city} data={data}/>
                )
            })}
        </>
    );
};

export default RoutesList;