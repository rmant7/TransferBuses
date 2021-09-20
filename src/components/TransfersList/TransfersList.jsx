import React, { useState } from "react";
import "./TransfersList.css";
import Transfer from "../Transfer/Transfer";
import { useSelector } from "react-redux";
import { getCityById } from "../../utils/cities";
import FilterComponent from "../Filter/FilterComponent";
import { filters } from "../../utils/filters";

export default function TransfersList({ transfers }) {
    const lang = useSelector((state) => state.app.lang);
    const [filteredTransfers, setFilteredTransfers] = useState([]);

    const applyFilterFromCityHandler = (value) => {
        const tmp = transfers.filter((item) => {
            const city = getCityById(item.from);
            const cityName = lang.includes("ru") ? city.name_ru : city.name;
            return cityName.toLowerCase().includes(value.toLowerCase());
        });
        console.log(transfers);
        setFilteredTransfers(tmp);
    };

    // console.log("transfers: ", transfers);
    return (
        <div className="transfers">
            <div style={{ display: "inline-block", margin: "10px 0" }}>
                <FilterComponent
                    name={filters[0].category}
                    handler={applyFilterFromCityHandler}
                />
            </div>
            {filteredTransfers.lenth === 0
                ? transfers.map((transfer) => (
                      <Transfer key={transfer.id} transfer={transfer} />
                  ))
                : filteredTransfers.map((transfer) => (
                      <Transfer key={transfer.id} transfer={transfer} />
                  ))}
        </div>
    );
}
