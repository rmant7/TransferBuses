import React from 'react';
import styles from "./Buttons.module.css";


const BookingHostel = () => {
    return (
        <div className={styles.buttons}>
            <div className={styles.actBtnCont}>
                <button className={styles.actionBtn}>Booking.com</button>
                <button className={styles.actionBtn}>Hostel world</button>
            </div>
        </div>
    );
};

export default BookingHostel;