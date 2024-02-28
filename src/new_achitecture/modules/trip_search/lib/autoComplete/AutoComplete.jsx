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
                                         // isInputTo,
                                         isActiveTo,
                                         setIsActiveTo,
                                     }) {
    const [optionsActive, setOptionsActive] = useState(false);

    const onFocus = () => {
        // if (!optionsActive) {
        setOptionsActive(true);
        // setIsActiveTo(true);
    };

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
                        setOptionsActive(false);
                        // setIsActiveTo(false);
                        // setOptions([])
                    }, 100);
                }}
                onFocus={onFocus}
            />
            <ul>
                {!options.length && isActiveTo && !value ? (
                    <li
                        onClick={() => {
                            setValue("Anywhere");
                        }}
                    >
                        Anywhere
                    </li>
                ) : undefined}
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
                        // console.log("city from autoComplete", city)
                        const formattingCity = nameOfCity(city);
                        return (
                            <AutoCompleteItemSecondStep
                                key={formattingCity.id}
                                city={formattingCity}
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