import React from 'react';
import TipsComponent from "../presentation/TipsComponent/TipsComponent";
import FooterComponent from "../presentation/FooterComponent/FooterComponent";
import FindBudget from "../presentation/ButtonsComponent/Find&Budget";
import BookingHostel from "../presentation/ButtonsComponent/Booking&Hostel";

const AccommodationsPage = () => {
    return (
        <div>
            <FindBudget/>
            <TipsComponent/>
            <BookingHostel/>
            <FooterComponent/>
        </div>
    );
};

export default AccommodationsPage;