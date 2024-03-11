import React from 'react';
import FindBudget from "../presentation/ButtonsComponent/Find&Budget";
import BookingHostel from "../presentation/ButtonsComponent/Booking&Hostel";
import FooterComponent from "../presentation/FooterComponent/FooterComponent";
import ReadMoreComponent from "../presentation/ReadMoreComponent/ReadMoreComponent";

const ReadMorePage = () => {
    return (
        <div>
            <FindBudget/>
            <ReadMoreComponent/>
            <BookingHostel/>
            <FooterComponent/>
        </div>
    );
};

export default ReadMorePage;