import React from 'react';
import FooterComponent from "../FooterComponent/FooterComponent";
import FindBudget from "../Buttons/Find&Budget";
import BookingHostel from "../Buttons/Booking&Hostel";

const DescriptionComponent = () => {
    const divStyle = {
        margin: '100px 0',
    };
    return (
        // <div style={divStyle}>
        <div>
            <FindBudget/>
            <div>City detail page</div>
            <BookingHostel/>
            <FooterComponent/>
        </div>
    );
};

export default DescriptionComponent;