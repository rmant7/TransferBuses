import React, { useState } from "react";
import "./TransfersList.css";
import Transfer from "../Transfer/Transfer";
import { useSelector } from "react-redux";
import { getCityById } from "../../utils/cities";
import FilterComponent from "../Filter/FilterComponent";
import { Chip, Divider, Typography } from "@material-ui/core";
import i18n from "i18next";

export default function TransfersList({ transfers }) {
    const lang = useSelector((state) => state.app.lang);
    const [filteredTransfers, setFilteredTransfers] = useState([]);

    const applyFilterFromCityHandler = (value) => {
        const tmp = transfers.filter((item) => {
            const city = getCityById(item.from);
            const cityName = lang.includes("ru") ? city.name_ru : city.name;
            return cityName.toLowerCase().includes(value.toLowerCase());
        });
        setFilteredTransfers(tmp);
    };

    // console.log("transfers: ", transfers);
    return (
        <>
            <div className="filters">
                <Typography variant="button" display="block" gutterBottom>
                    {i18n.t("Filter By")}
                </Typography>
                <FilterComponent
                    name={i18n.t("From City")}
                    handler={applyFilterFromCityHandler}
                    array={transfers}
                />
            </div>
            <div className="transfers">
                {filteredTransfers.lenth === 0
                    ? transfers.map((transfer) => (
                          <Transfer key={transfer.id} transfer={transfer} />
                      ))
                    : filteredTransfers.map((transfer) => (
                          <Transfer key={transfer.id} transfer={transfer} />
                      ))}
            </div>
        </>
    );
}
