import classes from "./TransferCardComponent.module.css";
import i18n from "i18next";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { currencies } from "../../../utils/currencies";
import { getCityById } from "../../../utils/cities";
import { getCurrency, getLanguage } from "../../../redux/selectors";
import { Button, Divider } from "@material-ui/core";
import { PASSENGER_ROUTE } from "../../../utils/constants";
import ArrowIcon from "../../../assets/upward-arrow.png";
import ScheduleIcon from "../../../assets/schedule.png";
import PetsAllowedIcon from "../../../assets/pets-allowed.png";
import ParcelIcon from "../../../assets/parcel.png";
import WalletIcon from "../../../assets/wallet.png";
import TimingIcon from "../../../assets/timing.png";
import { months_en } from "../../../utils/months-util";

export default function TransferCardComponent({ transfer, id }) {
  const globalCurrencyCode = useSelector(getCurrency);
  const history = useHistory();
  const lang = useSelector(getLanguage);
  let priceNum;
  let priceToDisplay;

  // check if currency selected in app (globalCurrency)
  const globalCurrency = currencies.find((cur) => cur.code === globalCurrencyCode);
  const transferCurrency =
    currencies.find((cur) => cur.code === transfer.currency) || currencies.find((cur) => cur.code === "EUR");

  console.log("depTime = ", transfer.departureTime);
  console.log("transfer.timeZone = ", transfer.timeZone);
  //const timeZoneName = timeZones.find(tz => tz.shift === transfer.timeZone)?.name
  const timeZoneName = "GMT+" + transfer.timeZone + " " + i18n.t("timezone." + transfer.timeZone);

  const departureTimeSplit = transfer.departureTime.split(":");

  if (currencies.map((cur) => cur.code).includes(transfer.currency)) {
    // IF transfer.currency IS IN THE currencies ARRAY

    if (transfer.currency === globalCurrencyCode) {
      // NO NEED TO RECALCULATE IF CURRENCIES ARE EQUAL
      priceNum = transfer.price;
    } else {
      priceNum =
        Math.round(
          ((transfer.price * globalCurrency.oneEuroRate) / transferCurrency.oneEuroRate + Number.EPSILON) *
            100
        ) / 100;
    }
  } else {
    // IF transfer.currency IS not IN THE currencies ARRAY, ASSUME IT IS EURO
    if (globalCurrencyCode === "EUR") {
      priceNum = transfer.price;
    } else {
      priceNum = Math.round((transfer.price * globalCurrency.oneEuroRate + Number.EPSILON) * 100) / 100;
    }
  }

  if (globalCurrencyCode === "USD") {
    priceToDisplay = globalCurrency.r2rSymbol + priceNum;
  } else {
    priceToDisplay = priceNum + " " + globalCurrency.r2rSymbol;
  }

  console.log("transfer.regularTripsDays: ", transfer.regularTripsDays);

  return (
    <div className={classes.transfer_card}>
      <div className={classes.transfer_card_header}>
        <div className={classes.way}>
          <span className={classes.text}>{getCityById(transfer.from).name}</span>
          <img src={ArrowIcon} className={classes.arrow_icon} />
          <span className={classes.text}>{getCityById(transfer.to).name}</span>
        </div>
      </div>
      <Divider variant="middle" style={{ margin: "10px" }} />
      <div className={classes.content}>
        <div className={classes.icon_text}>
          <img src={ScheduleIcon} className={classes.icon_style} />
          {!transfer.regularTrips ? (
            <div className={classes.text}>
              {new Date(transfer.date).getDate()} {months_en[new Date(transfer.date).getMonth()]}{" "}
              {new Date(transfer.date).getFullYear()}
            </div>
          ) : (
            <span className={classes.text}>{i18n.t("Regular trips")}</span>
          )}
        </div>
        <div className={classes.icon_text}>
          <img src={TimingIcon} className={classes.icon_style} />
          <span className={classes.text}>{transfer.duration}</span>
        </div>
        <div className={classes.icon_text}>
          <img src={WalletIcon} className={classes.icon_style} />
          <span className={classes.text}>{priceToDisplay}</span>
        </div>
        {transfer.passAParcel && <img src={ParcelIcon} className={classes.icon_style} />}
        {transfer.isPetsAllowed && <img src={PetsAllowedIcon} className={classes.icon_style} />}
      </div>
      <Divider variant="middle" style={{ margin: "10px" }} />
      <div className={classes.transfer_card_footer}>
        <Button
          size="medium"
          color="primary"
          variant="contained"
          onClick={() => history.push(`${PASSENGER_ROUTE}/${JSON.stringify(transfer)}`)}
          style={{ marginRight: "0", marginLeft: "auto" }}
        >
          {i18n.t("More")}
        </Button>
      </div>
    </div>
  );
}
