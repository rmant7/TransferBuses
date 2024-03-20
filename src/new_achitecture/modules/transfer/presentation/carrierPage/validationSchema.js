import * as yup from 'yup';

export const schema = yup.object().shape({
    from: yup.string().required('from.Required'),
    to: yup.string().required('to.Required'),
    date: yup.date().required('date.Required'),
    departureTime: yup.string().required('departureTime.Required'),
    places: yup
        .number()
        .min(1, 'Available places must be more or equal to 1')
        .max(8, 'Available places must be less or equal to 8')
        .required('places.Required'),
    phoneNumber: yup
        .string()
        .required('phoneNumber.Required')
        .phone(undefined, 'phoneNumber.isNotValid'),
    price: yup.number().positive('price.OnlyPositive'),
});
