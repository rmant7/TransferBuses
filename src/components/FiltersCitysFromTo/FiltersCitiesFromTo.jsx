import React, { useEffect, useState } from "react";
import classes from "./FiltersCitiesFromTo.module.css";
import { getCityById } from "../../utils/cities";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import ArrowForwardSharpIcon from "@material-ui/icons/ArrowForwardSharp";
import i18next from "i18next";
import FilterComponent from "../Filter/FilterComponent";

export default function FiltersCitiesFromTo({ transfers, setFilteredArray }) {
    const lang = useSelector((state) => state.app.lang);
    const [fromTo, setFromTo] = useState({ from: "", to: "" });
    const [filteredTransfers, setFilteredTransfers] = useState(transfers);

    useEffect(() => {
        applyFilterHandler(fromTo);
    }, [fromTo]);

    const itemsToCities = Array.from(
        new Set(
            filteredTransfers.map((item) => {
                const city = getCityById(item.to);
                return lang.includes("ru") ? city.name_ru : city.name;
            })
        )
    );

    const itemsFromCities = Array.from(
        new Set(
            filteredTransfers.map((item) => {
                const city = getCityById(item.from);
                return lang.includes("ru") ? city.name_ru : city.name;
            })
        )
    );

    const setFromHandler = (value) => {
        setFromTo({...fromTo, from: value});
    };

    const setToHandler = (value) => {
        setFromTo({...fromTo, to: value});
    };

    const applyFilterHandler = ({from, to}) => {
        console.log({from, to});
        const tmp = transfers
            .filter((item) => {
                const city = getCityById(item.from);
                const cityName = lang.includes("ru") ? city.name_ru : city.name;
                return cityName.toLowerCase().includes(from.toLowerCase());
            })
            .filter((item) => {
                const city = getCityById(item.to);
                const cityName = lang.includes("ru") ? city.name_ru : city.name;
                return cityName.toLowerCase().includes(to.toLowerCase());
            });
        setFilteredTransfers(tmp);
        setFilteredArray(tmp);
    };

    return (
        <div className={classes.filters}>
            <Typography variant="button" display="block" gutterBottom>
                {i18next.t("Filter By")}
            </Typography>
            <FilterComponent
                name={i18next.t("From City")}
                handler={setFromHandler}
                items={itemsFromCities}
            />
            <ArrowForwardSharpIcon style={{ margin: "-20px 15px" }} />
            <FilterComponent
                name={i18next.t("To City")}
                handler={setToHandler}
                items={itemsToCities}
            />
        </div>
    );
}
