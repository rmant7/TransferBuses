import React from 'react';
import TipsComponent from "../TipsComponent/TipsComponent";
import FooterComponent from "../FooterComponent/FooterComponent";
import FindBudget from "../Buttons/Find&Budget";
import BookingHostel from "../Buttons/Booking&Hostel";

const AccommodationsComponent = () => {
    return (
        <div>
            <FindBudget/>
            <TipsComponent/>
            <BookingHostel/>
            <FooterComponent/>
        </div>
    );
};

export default AccommodationsComponent;