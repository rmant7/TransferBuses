import React from "react";
import "./Cheaptrip.css";
import Logo_Cht from "./Logo_ChT_2.png";

export default function Cheaptrip() {
  return (
    <div className="Cheaptrip">
      <div className="partners">
        <h3>Our partners:</h3>
      </div>
      <div className="title">CheapTrip Pay less,visit more!</div>
      <div className="caption">
        <a href="https://cheaptrip.guru/">
          <img src={Logo_Cht} alt="CheapTrip Logo" />
        </a>
      </div>
    </div>
  );
}
