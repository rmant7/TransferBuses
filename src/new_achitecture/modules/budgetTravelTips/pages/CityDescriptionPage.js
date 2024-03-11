import React from 'react';
import FooterComponent from "../presentation/FooterComponent/FooterComponent";
import FindBudget from "../Buttons/Find&Budget";
import BookingHostel from "../Buttons/Booking&Hostel";
import CityDetailComponent from "../presentation/CityDetailComponent/CityDetailComponent";

const CityDescriptionPage = () => {
    return (
        <div>
            <FindBudget/>
            <CityDetailComponent/>
            <BookingHostel/>
            <FooterComponent/>
        </div>
    );
};

export default CityDescriptionPage;