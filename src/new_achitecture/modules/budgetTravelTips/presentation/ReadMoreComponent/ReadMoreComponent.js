import React from 'react';
import dataForReadMore from "./readMoreJson.json";
import readMoreStyles from "./ReadMore.module.css";


const readMore = () => {
    const data = dataForReadMore[0];
    // console.log(data)

    return (
        <div>
            <div style={{ textAlign: "center" }}>
                <h2 className={readMoreStyles.section_title}>
                    {data.title}
                </h2>
            </div>
            <div className={readMoreStyles.container}>
                <img className={readMoreStyles.city_img_attraction} alt="City Attraction Image" className={readMoreStyles.image} src={data.imageUrl} />
                <h3 className={readMoreStyles.title}>
                    {data.description}
                </h3>
                <p className={readMoreStyles.text}>
                    {data.text}
                </p>
                <div className={readMoreStyles.links}>
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