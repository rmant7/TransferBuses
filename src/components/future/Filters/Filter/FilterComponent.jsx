import classes from "./Filter.module.css";
import { TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

export default function FilterComponent({ label, getOptionLabel, options, handler, inputValue }) {
  return (
    <div className={classes.filter}>
      <Autocomplete
        freeSolo
        variant="outlined"
        id="combo-box-demo"
        inputValue={inputValue}
        options={options}
        getOptionLabel={getOptionLabel}
        sx={{ width: 500 }}
        onInputChange={handler}
        renderInput={(params) => <TextField variant="outlined" {...params} label={label} />}
      />
    </div>
  );
}
