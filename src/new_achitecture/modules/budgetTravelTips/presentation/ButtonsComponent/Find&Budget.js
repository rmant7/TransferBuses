import React from 'react';
import styles from "./FindBudget.module.css";
import {dataButtons} from "./dataButtons";

const FindBudget = () => {
    const data = dataButtons[0];
    return (
        <div className={styles.sectionBtn}>
            <a className={styles.actionBtn} href={data.cheapestRoutesLink}>
                Find cheapest routes
            </a>
            <a className={styles.budgetBtn} href={data.travelTipsLink}>
                Budget travel tips
            </a>
        </div>
    );
};

export default FindBudget;