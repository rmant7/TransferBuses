import React from 'react';
import styles from "./BookingHostel.module.css";
import {dataButtons} from "./dataButtons";

const BookingHostel = () => {
    const data = dataButtons[0];
    return (
        <div className={styles.buttons}>
            <div className={styles.actBtnCont}>
                <a className={styles.actionBtn} href={data.bookingLink} target="_blank">
                    Booking.com
                </a>
                <a className={styles.actionBtn} href={data.hostelWorldLink} target="_blank">
                    Hostel world
                </a>
            </div>
        </div>
    );
};

export default BookingHostel;