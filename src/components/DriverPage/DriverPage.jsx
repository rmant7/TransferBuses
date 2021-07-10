import React from 'react';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import './DriverPage.css'

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
    //     .string('Enter available places')
    //     .required('Places is required'),

});


export default function DriverPage() {
    const formik = useFormik({
        initialValues: {
            // from: "",
            // to: "",
            // date: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
            date: new Date().toJSON().slice(0, 10),
            email: "",
            places: 1,
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('hello')
            alert(JSON.stringify(values, null, 2));
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
                    label="Date"
                    type="date"
                    margin="normal"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    inputProps={{
                        min: new Date().toISOString().slice(0, 10)
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

