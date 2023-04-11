import { Link } from "react-router-dom";
import classes from "./CityCard.module.css";

const CityCard = ({ city }) => {
  return (
    <Link to={`/travel-tips?city=${city.id}`} className={classes.card}>
      <img
        src={require(`../../assets/city-pictures/${city.img}`)}
        alt="city"
        className={classes.img}
      />
      <p className={classes.title}>{city.name}</p>
    </Link>
  );
};

export default CityCard;
