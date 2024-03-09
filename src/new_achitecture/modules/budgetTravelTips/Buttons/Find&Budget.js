import React from 'react';
import styles from "./FindBudget.module.css";

const FindBudget = () => {
    return (
        // <div className={styles.buttons}>
            <div className={styles.sectionBtn}>
                <button className={styles.actionBtn}>Find cheapest routes</button>
                <button className={styles.budgetBtn}>Budget travel tips</button>
            </div>
        // </div>
    );
};

export default FindBudget;