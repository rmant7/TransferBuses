import "./AutoComplete.css";
import { useState } from "react";
import AutoCompleteItemFirstStep from "./AutoCompleteItemFirstStep";
import AutoCompleteItemSecondStep from "./AutoCompleteItemSecondStep";
import IsSecondStep from "./AutoCompleteSecondStepIfOneCity";
import { nameOfCity } from "./nameOfCity";

export default function AutoComplete({
  value, //******data from input********//
  setValue,
  placeholder,
  onChange,
  options,
  setJson,
  json, ///*****data after step 1********** */
  setOptions,
  resultClick,
  findCities,
}) {
  const [optionsActive, setOptionsActive] = useState(false);

  return (
    <div className="autoComplete">
      <input
        className="input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onClick={!optionsActive ? setOptionsActive(true) : undefined}
        onBlur={() => {
          setTimeout(() => {
            // setOptions([])
          }, 200);
        }}
      />
      <ul>
        {options &&
          options
            .slice(0, 10)
            .map((option) => (
              <AutoCompleteItemFirstStep
                key={option}
                option={option}
                setValue={setValue}
                setOptions={setOptions}
                findCities={findCities}
              />
            ))}

        {json &&
          json.length > 1 &&
          json.slice(0, 10).map((city) => {
            console.log("city from AutoComplete", city)
            const formatingCity = nameOfCity(city);
            return (
              <AutoCompleteItemSecondStep
                key={formatingCity.id}
                city={formatingCity}
                resultClick={resultClick}
                setJson={setJson}
              />
            );
          })}
        {json && json.length === 1 && (
          <IsSecondStep
            json={json}
            resultClick={resultClick}
            setJson={setJson}
          />
        )}
      </ul>
    </div>
  );
}
