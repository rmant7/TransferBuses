import classes from "./TransferCardComponent.module.css";
import i18n from "i18next";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { currencies } from "../../currenciesSelector/currencies";
import { getCityById } from "../../../../trip_search/lib/filterSearch/cities/cities";
import { getCurrency, getLanguage } from "../../../../trip_search/presentation/redux/reducers/selectors";
import { Button, Divider } from "@material-ui/core";
import { PASSENGER_ROUTE } from "../../../../trip_search/domain/entites/utils/constants/constants";
import ArrowIcon from "../../../../../general/assets/upward-arrow.png";
import ScheduleIcon from "../../../../../general/assets/schedule.png";
import PetsAllowedIcon from "../../../../../general/assets/pets-allowed.png";
import ParcelIcon from "../../../../../general/assets/parcel.png";
import WalletIcon from "../../../../../general/assets/wallet.png";
import TimingIcon from "../../../../../general/assets/timing.png";
import { months_en } from "../../../../trip_search/domain/entites/utils/months/months-util";

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
  console.log("transferPage.timeZone = ", transfer.timeZone);
  //const timeZoneName = timeZones.find(tz => tz.shift === transferPage.timeZone)?.name
  const timeZoneName = "GMT+" + transfer.timeZone + " " + i18n.t("timezone." + transfer.timeZone);

  const departureTimeSplit = transfer.departureTime.split(":");

  if (currencies.map((cur) => cur.code).includes(transfer.currency)) {
    // IF transferPage.currency IS IN THE currencies ARRAY

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
    // IF transferPage.currency IS not IN THE currencies ARRAY, ASSUME IT IS EURO
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

  console.log("transferPage.regularTripsDays: ", transfer.regularTripsDays);

  return (
    <div className={classes.transfer_card}>
      <div className={classes.transfer_card_header}>
        <div className={classes.way}>
          <span className={classes.text}>{getCityById(transfer.from).name}</span>
          <img src={ArrowIcon} className={classes.arrow_icon} alt="icon" />
          <span className={classes.text}>{getCityById(transfer.to).name}</span>
        </div>
      </div>
      <Divider variant="middle" style={{ margin: "10px" }} />
      <div className={classes.content}>
        <div className={classes.icon_text}>
          <img src={ScheduleIcon} className={classes.icon_style} alt="icon" />
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
          <img src={TimingIcon} className={classes.icon_style} alt="icon" />
          <span className={classes.text}>{transfer.duration}</span>
        </div>
        <div className={classes.icon_text}>
          <img src={WalletIcon} className={classes.icon_style} alt="icon" />
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
