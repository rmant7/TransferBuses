import React from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './DriverPage.css'
import {uploadTransfer} from "../../services/data-service";
import {useHistory} from "react-router-dom";

const validationSchema = yup.object({
    // from: yup
    //     .string('Enter or select a city')
    //     .required('From is required'),
    // to: yup
    //     .string('Enter or select a city')
    //     .required('To is required'),
    // date: yup
    //     .string('Enter transfer date')
    //     .required('Date is required'),
    // email: yup
    //     .string('Enter your email')
    //     .email('Enter a valid email')
    //     .required('Email is required'),
    // places: yup
    //     .number()
    //     .min(1, "Available places must be more or equal to 1")
    //     .max(8, "Available places must be less or equal to 8")
    //     .required("Required field"),

});


export default function DriverPage() {
    const history = useHistory();
    const formik = useFormik({
        initialValues: {
            // from: "",
            // to: "",
            // date: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
            // date: new Date().toJSON().slice(0, 10),
            date: new Date().toJSON().slice(0, 16),
            email: "",
            places: 1,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // console.log('hello')
            // alert(JSON.stringify(values, null, 2));
            console.log("SUBMITTING");
            uploadTransfer(
                values.from,
                values.to,
                values.date,
                values.email,
                values.places,

            )
                .then((response) => {
                    console.log(response);
                    history.push("/");
                })
                .catch((error) => {
                    console.log(error);
                });

        },
    });

    const cities = [
        {title: 'Moscow'},
        {title: 'Odessa'},
        {title: 'Minsk'},
    ]

    const defaultProps = {
        options: cities,
        getOptionLabel: (option) => {
            return option.title
        },
    };

    return (
        <div className={'container'}>
            <form onSubmit={formik.handleSubmit}>


                <Autocomplete
                    {...defaultProps}
                    id="from"
                    name={'from'}
                    value={formik.values.to}
                    onChange={(e, v) => {
                        formik.setFieldValue("from", v?.title || "");
                    }}
                    renderInput={
                        (params) => <TextField {...params}
                                               label="From" margin="normal" value={formik.values.from}
                        />
                    }
                />
                <Autocomplete
                    {...defaultProps}
                    id="to"
                    name={'to'}
                    value={formik.values.to}
                    onChange={(e, v) => {
                        formik.setFieldValue("to", v?.title || "");
                    }}

                    renderInput={
                        (params) => <TextField {...params}
                                               label="To" margin="normal"/>
                    }
                />
                <TextField
                    id="date"
                    label="Date and time"
                    // type="date"
                    type="datetime-local"
                    margin="normal"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    inputProps={{
                        // min: new Date().toISOString().slice(0, 10)
                        min: new Date().toISOString().slice(0, 16)
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Email"
                    margin="normal"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />


                <TextField
                    value={formik.values.places}
                    margin="normal"
                    id="places"
                    label={"Places"}
                    onChange={formik.handleChange}
                    inputProps={{
                        step: 1,
                        min: 1,
                        max: 8,
                        type: 'number',
                        // 'aria-labelledby': 'input-slider',
                    }}
                />
                <div className={'submitBtn'}>
                    <Button color="primary" variant="contained" fullWidth type="submit">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );
};

