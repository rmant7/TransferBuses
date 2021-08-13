import React from "react";
import "./TransfersList.css";
import Transfer from "../Transfer/Transfer";

export default function TransfersList({ transfers }) {
  // console.log("transfers: ", transfers);
  return (
    <div className="transfers">
        {transfers.map((transfer) => (
          <Transfer key={transfer.id} transfer={transfer} />
        ))}
    </div>
  );
}
