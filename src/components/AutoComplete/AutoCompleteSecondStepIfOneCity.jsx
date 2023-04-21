import "./AutoComplete.css";
import { nameOfCity } from "./nameOfCity";
import { useEffect } from "react";

export default function IsSecondStep({ json, resultClick, setJson }) {
  useEffect(() => {
    if (json && json.length === 1) {
      const city = nameOfCity(json[0]);
      resultClick({
        geometry: city.geometry,
        display_name: city.city,
      });
      setJson([]);
    }
  }, [json, resultClick, setJson]);
  return <p>Done</p>;
}
