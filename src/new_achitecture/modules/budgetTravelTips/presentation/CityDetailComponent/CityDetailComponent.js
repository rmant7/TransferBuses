import styles from './CityDetail.module.css';
import React from 'react';
import {Container} from "@material-ui/core";
import {city} from "./infoCityExample"
import dataForReadMore from "./readMoreJson.json";

const CityDetailPage = () => {
    const data = dataForReadMore[0];
    const cityName = city[0].Dublin.cityName;
    const imageCity = city[0].Dublin.src;
    const textCity = city[0].Dublin.description;

    const handleMainPageClick = () => {
        // Implement logic for cheapest routes
    };

    const handleTravelTipsClick = () => {
        // Implement logic for budget travel tips
    };

    const handleBookingClick = () => {
        // Implement logic for Booking.com
    };

    const handleHostelClick = () => {
        // Implement logic for Hostel world
    };

    return (
        <Container maxWidth="xl" >
                <div className={styles.centeredContainer}>
                    <h1 className={styles.sectionTitle}>{cityName}</h1>
                    <div className={styles.flexContainer}>
                        <div className={styles.cityImgAttraction}><img className={styles.cityImgAttraction}
                                                                       src={imageCity}
                                                                       alt={cityName}/></div>
                        <p id={styles.textCity} className={styles.textCity}>{textCity}</p>
                    </div>
                </div>
        </Container>
    );
};

export default CityDetailPage;