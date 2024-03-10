import React from 'react';
import styles from './FooterComponent.module.css';
import {Link} from 'react-router-dom';

const Button = ({text, to}) => {
    return (
        <div className={styles.buttonsDiv}>
            <Link to={to} className={styles.actionBtn}>
                {text}
            </Link>
        </div>
    );
};

const FooterComponent = () => {
    // const handleButtonClick = () => {
    //     console.log('Кнопка нажата');
    // };

    return (
        <div>
            <div className={styles.customDivider}></div>
            <div className={styles.buttons}>
                {/*<Button text="Description" onClick={handleButtonClick}/>*/}
                <Button text="Description" to="/description"/>
                <Button text="Accommodation" to="/accommodation"/>
                <Button text="Events & festivals" to="/events_festivals"/>
                <Button text="City attractions" to="/city_attractions"/>
                <Button text="Cheap eats" to="/cheap_eats"/>
                <Button text="Children attractions" to="/children_attractions"/>
                <Button text="Transportations" to="/transportations"/>
                <Button text="Routes from CITY_NAME" to="/routes_from_city_name"/>
            </div>
        </div>
    );
};

export default FooterComponent;