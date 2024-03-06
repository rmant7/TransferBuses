import React from 'react';
import styles from './TipsComponent.module.css';
import accommodations from './dataExample';

const TipsComponent = () => {
    return (
        <div>
            <div className={styles.sectionTitle}>
                <h2>Accommodations in CITY_NAME</h2>
            </div>
            <div className={styles.mainContainer}>
                {accommodations.map((accommodation, index) => (
                    <div className={styles.itemContainer} key={index}>
                        <div className={styles.itemContent}>
                            <img src={accommodation.image} alt="Accomodation Image"/>
                            <h3 className={styles.textHeader}>{accommodation.title}</h3>
                            <p className={styles.text}>{accommodation.description}</p>
                        </div>
                        <div>
                            <a className={styles.actionBtn} href={accommodation.link}>Read more...</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TipsComponent;

