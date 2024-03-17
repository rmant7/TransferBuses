
import React from 'react';
import "./readMore.css";
import dataForReadMore from "./readMoreJson.json";
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.5.7/css/mdb.min.css" />

export const readMore = () => {
const data = dataForReadMore[0];
    // console.log(data)

    return (
        <div>
            <header className="container-fluid header">
                <div className="headline">
                    <a aria-current="page" href="/budgettraveltips/">
                        <h1 className="headline__logo">
                            CheapTrip
                        </h1>
                    </a>
                    <h6 class="headline__slogan">
                        Pay less, visit more!
                    </h6>
                </div>
            </header>
            <div className="section-btn">
                <a className="action-btn" href={data.relatedSiteLink}>
                    Find cheapest routes
                </a>
                <a className='budget-btn' href='/budgettraveltips/'>
                    Budget travel tips
                </a>
            </div>
            <div style={{ textAlign: "center" }}>
                <h2 className="section-title">
                    {data.title}
                </h2>
            </div>
            <div id="container">
                <img className='city-img-attraction' alt="City Attraction Image" id="image" src={data.imageUrl} />
                <h3 id="title">
                    {data.description}
                </h3>
                <p id="text">
                    {data.text}
                </p>
                <div id="links">
                    <a href={data.relatedSiteLink} id="link_1" target="_blank">
                        Visit related site
                    </a>
                    <a href={data.descriptionLink} id="link_2" target="_blank">
                    </a>
                    <a href={data.descriptionLink} id="link_3" target="_blank">
                    </a>
                </div>
            </div>
            <div className="buttons">
                <div className="act-btn-cont">
                    <a className="action-btn" href={data.bookingLink} target="_blank">
                        Booking.com
                    </a>
                    <a className="action-btn" href={data.hostelWorldLink} target="_blank">
                        Hostel world
                    </a>
                </div>
            </div>
            <div className="custom-divider">
            </div>
            <div className="buttons">
                <div>
                    <a className='action-btn' href='/budgettraveltips/tree/city_descriptions/en/almeria'>
                        Description
                    </a>
                </div>
                <div>
                    <a className='action-btn' href='/budgettraveltips/tree/accommodations/en/almeria/list'>
                        Accommodations
                    </a>
                </div>
                <div>
                    <a className='action-btn' href='/budgettraveltips/tree/events_festivals/en/almeria/list'>
                        Events & festivals
                    </a>
                </div>
                <div>
                    <a className='action-btn' href='/budgettraveltips/tree/city_attractions/en/almeria/list'>
                        City attractions
                    </a>
                </div>
                <div>
                    <a className='action-btn' href='/budgettraveltips/tree/cheap_eats/en/almeria/list'>
                        Cheap eats
                    </a>
                </div>
                <div>
                    <a className='action-btn' href='/budgettraveltips/tree/children_attractions/en/almeria/list'>
                        Children attractions
                    </a>
                </div>
                <div>
                    <a class='action-btn' href='/budgettraveltips/tree/transportations/en/almeria'>
                        Transportations
                    </a>
                </div>
                <div>
                    <a class='action-btn' href='/budgettraveltips/tree/routes/en/almeria'>
                        Routes from Almeria
                    </a>
                </div>
            </div>
        </div>
    );
};
