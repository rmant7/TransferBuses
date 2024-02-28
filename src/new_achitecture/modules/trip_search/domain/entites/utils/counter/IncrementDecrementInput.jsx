import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {TextField} from "@material-ui/core";


export default function IncrementDecrementInput() {
    const [counter, setCounter] = useState(0);
    return (
        <ButtonGroup size="small" aria-label="small outlined button group">

            <Button disabled={counter >= 5} onClick={() => {
                setCounter(counter + 1)
            }}>+</Button>

            {<TextField disabled>{counter}</TextField>}

            {<Button disabled={counter <= 0} onClick={() => {
                setCounter(counter - 1)
            }}>-</Button>}

        </ButtonGroup>
    )
}