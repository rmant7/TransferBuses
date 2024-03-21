import React from 'react';
import FooterComponent from "../presentation/FooterComponent/FooterComponent";
import FindBudget from "../presentation/ButtonsComponent/Find&Budget";
import BookingHostel from "../presentation/ButtonsComponent/Booking&Hostel";
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