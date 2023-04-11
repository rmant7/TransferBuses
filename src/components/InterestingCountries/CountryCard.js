import { Link } from "react-router-dom";
import classes from "./CountryCard.module.css";

const CountryCard = ({ country }) => {
  return (
    <Link to={`/travel-tips?country=${country.id}`} className={classes.card}>
      <div className={classes.container}>
        {country.imgs.map((img) => {
          return (
            <img
              src={require(`../../assets/city-pictures/${img}`)}
              alt="city"
              className={classes.img}
            />
          );
        })}
      </div>
      <div className={classes.title_box}>
        <p className={classes.title}>{country.name}</p>
      </div>
    </Link>
  );
};

export default CountryCard;
