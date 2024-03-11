import React from 'react';
import "./ReadMore.css";
import dataForReadMore from "./readMoreJson.json";

const readMore = () => {
    const data = dataForReadMore[0];

    return (
        <div>
            <div style={{textAlign: "center"}}>
                <h2 className="section-title">
                    {data.title}
                </h2>
            </div>
            <div id="container">
                <img className='city-img-attraction' alt="City Attraction Image" id="image" src={data.imageUrl}/>
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
        </div>
    );
};

export default readMore;