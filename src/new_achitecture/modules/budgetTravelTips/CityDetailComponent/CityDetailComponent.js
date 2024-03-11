import styles from './CityDetail.module.css';

import React from 'react';
import {Container} from "@material-ui/core";
import {city} from "./infoCityExample"
// import "./CityDetailPage.css";
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
            <div className="section-btn">
                <a className="action-btn" href={data.relatedSiteLink}>
                    Find cheapest routes
                </a>
                <a className='budget-btn' href='/budgettraveltips/'>
                    Budget travel tips
                </a>
            </div>
            <div className="centeredContainer">
                <h1 className="sectionTitle">{cityName}</h1>
                <div className="flexContainer">
                    <div className="cityImgAttraction"><img className="city-img-attraction" src={imageCity}
                                                            alt={cityName}/></div>
                    <p id="textCity" className="textCity">{textCity}</p>
                </div>
            </div>
            <div className="act-btn-cont">
                <a className="action-btn" href={data.bookingLink} target="_blank">
                    Booking.com
                </a>
                <a className="action-btn" href={data.hostelWorldLink} target="_blank">
                    Hostel world
                </a>
            </div>
        </Container>
    );
};

export default CityDetailPage;