import React from 'react';
import styles from "./FindBudget.module.css";

const FindBudget = () => {
    return (
        <div className={styles.sectionBtn}>
            <a className={styles.actionBtn} href={'/'}>
                Find cheapest routes
            </a>
            <a className={styles.budgetBtn} href='/budgettraveltips/'>
                Budget travel tips
            </a>
        </div>
    );
};

export default FindBudget;