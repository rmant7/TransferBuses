import classes from "./TripCard.module.css";
import i18n from "i18next";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { getCityById } from "../../../utils/cities-util";
import { getCurrency, getLanguage } from "../../../redux/selectors";
import { Button, Divider } from "@material-ui/core";
import ArrowIcon from "../../../assets/upward-arrow.png";
import ScheduleIcon from "../../../assets/schedule.png";
import PetsAllowedIcon from "../../../assets/pets-allowed.png";
import ParcelIcon from "../../../assets/parcel.png";
import WalletIcon from "../../../assets/wallet.png";
import TimingIcon from "../../../assets/timing.png";
import { monthsEng } from "../../../utils/months-util";
import { TRANSFERS_PATH } from "../../../utils/constants";
import { convertToFixed, review } from "../../../utils/currency-util";

export default function TripCardComponent({ transfer }) {
  const currency = useSelector(getCurrency);
  const history = useHistory();
  const from = getCityById(transfer.from);
  const to = getCityById(transfer.to);
  const lang = useSelector(getLanguage);
  const convertedPrice = convertToFixed(transfer.price, transfer.currency, currency);
  const priceToDisplay = review(convertedPrice, currency);

  function dateView() {
    const date = new Date(transfer.date);
    return `${monthsEng[date.getMonth()].name} ${date.getDate()}, ${date.getFullYear()}`;
  }

  return (
    <div className={classes.trip_card}>
      <div className={classes.trip_card_header}>
        <div className={classes.way}>
          <span className={classes.text}>{lang === "en" ? from.name : from.name_ru}</span>
          <img src={ArrowIcon} className={classes.arrow_icon} alt="icon" />
          <span className={classes.text}>{lang === "en" ? to.name : to.name_ru}</span>
        </div>
      </div>
      <Divider variant="middle" style={{ margin: "10px" }} />
      <div className={classes.content}>
        <div className={classes.icon_text}>
          <img src={ScheduleIcon} className={classes.icon_style} alt="icon" />
          {!transfer.regularTrips ? (
            <div className={classes.text}>{dateView()}</div>
          ) : (
            <span className={classes.text}>{i18n.t("Regular trips")}</span>
          )}
        </div>
        <div className={classes.icon_text}>
          <img src={TimingIcon} className={classes.icon_style} alt="icon" />
          <span className={classes.text}>{transfer.duration ? transfer.duration : "--:--"}</span>
        </div>
        <div className={classes.icon_text}>
          <img src={WalletIcon} className={classes.icon_style} alt="icon" />
          <span className={classes.text}>{priceToDisplay}</span>
        </div>
        {transfer.passAParcel && <img src={ParcelIcon} className={classes.icon_style} alt="icon" />}
        {transfer.isPetsAllowed && <img src={PetsAllowedIcon} className={classes.icon_style} alt="icon" />}
      </div>
      <Divider variant="middle" style={{ margin: "10px" }} />
      <div className={classes.trip_card_footer}>
        <Button
          size="medium"
          color="primary"
          variant="contained"
          onClick={() => history.push(`${TRANSFERS_PATH}/${transfer._id}`)}
          style={{ marginRight: "0", marginLeft: "auto" }}
        >
          {i18n.t("More")}
        </Button>
      </div>
    </div>
  );
}
