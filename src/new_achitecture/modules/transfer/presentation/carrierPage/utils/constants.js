export const formikInitialValue={
    date: new Date().toJSON().slice(0, 10),
    departureTime: '',
    timeZone: userTimeZone.shift,
    phoneNumber: '',
    places: 1,
    price: '',
    currency: rideCurrency,
    duration: '',
    passAParcel: false,
    isPetsAllowed: false,
    additionalInfo: '',
    regularTrips: false,
    regularTripsDays: {
        _0monday: {
            selected: false,
            departureTime: '',
        },
        _1tuesday: {
            selected: false,
            departureTime: '',
        },
        _2wednesday: {
            selected: false,
            departureTime: '',
        },
        _3thursday: {
            selected: false,
            departureTime: '',
        },
        _4friday: {
            selected: false,
            departureTime: '',
        },
        _5saturday: {
            selected: false,
            departureTime: '',
        },
        _6sunday: {
            selected: false,
            departureTime: '',
        },
    },
}