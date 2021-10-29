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
import DurationIcon from "../../../assets/duration.png";
import { monthsEng } from "../../../utils/months-util";
import { TRANSFERS_PATH } from "../../../utils/constants";
import { convertToFixed, review } from "../../../utils/currency-util";
import IconTextComponent from "./IconText/IconTextComponent";
import IconComponent from "./Icon/IconComponent";

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
          <IconComponent icon={ArrowIcon} someClass={classes.arrow_icon} />
          <span className={classes.text}>{lang === "en" ? to.name : to.name_ru}</span>
        </div>
      </div>
      <Divider variant="middle" style={{ margin: "10px" }} />
      <div className={classes.content}>
        {!transfer.regularTrips ? (
          <IconTextComponent icon={ScheduleIcon} text={dateView()} />
        ) : (
          <IconTextComponent icon={ScheduleIcon} text={i18n.t("Regular trips")} />
        )}
        <IconTextComponent icon={DurationIcon} text={transfer.duration ? transfer.duration : "--:--"} />
        <IconTextComponent icon={WalletIcon} text={priceToDisplay} />
        {transfer.passAParcel && <IconComponent icon={ParcelIcon} />}
        {transfer.isPetsAllowed && <IconComponent icon={PetsAllowedIcon} />}
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
