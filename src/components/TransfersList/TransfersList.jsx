import React, { useState } from "react";
import "./TransfersList.css";
import Transfer from "../Transfer/Transfer";
import FiltersCitiesFromTo from "../FiltersCitysFromTo/FiltersCitiesFromTo";

export default function TransfersList({ transfers }) {
    const [filteredTransfers, setFilteredTransfers] = useState([]);

    const setFilteredArray = (filteredArray) => {
        setFilteredTransfers(filteredArray);
    };

    // console.log("transfers: ", transfers);
    return (
        <>
            <FiltersCitiesFromTo
                transfers={transfers}
                setFilteredArray={setFilteredArray}
            />
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
