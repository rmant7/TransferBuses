import { useEffect } from "react";
import { Box, Container, LinearProgress } from "@material-ui/core";
import Filters from "../Filters/Filters";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getNextTransfersAction, getTransfersAction } from "../../redux/actions/transfers-actions";
import { getFilters, getLoading, getTransfers } from "../../redux/selectors";
import Transfer from "../Transfer/Transfer";
import classes from "./PassengerPage.module.css";
import { useStyles } from "../../utils/useStyles";
import TripCardComponent from "../future/TripCard/TripCardComponent";
import { LoadingButton } from "@mui/lab";
import { Alert } from "@mui/material";
import i18n from "../../i18n";
// import "./PassengerPage.css";

function isNewDesign() {
  return process.env.REACT_APP_NEW_DESIGN && process.env.REACT_APP_NEW_DESIGN === "true";
}

export default function PassengerPage() {
  const dispatch = useDispatch();
  // const [transfers, setTransfers] = useState([]);
  // const [loading, setLoading] = useState();
  const transfers = useSelector(getTransfers);
  const filters = useSelector(getFilters);
  const loading = useSelector(getLoading);

  console.log(transfers);

  const addNextHandler = () => {
    dispatch(getNextTransfersAction(transfers.data));
  };

  useEffect(() => {
    dispatch(getTransfersAction());
  }, [dispatch]);

  return (
    <Container maxWidth="xl" className={classes.tb_padding}>
      <div className={classes.filters_sector}>
        <span>{i18n.t("Filter")}</span>
        <Filters />
      </div>
      {/* <div style={{ textAlign: "center", marginTop: "10px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            history.push(`${TRIPS_SEARCH_PATH}`);
          }}
        >
          {i18n.t("Filters")}
        </Button>
      </div> */}
      {/* <Divider style={{margin: "10px"}}/> */}
      {/* {loading && <h2>Loading...</h2>} */}
      {/* {!loading && <TransfersList transfers={transfers} />} */}
      <div className={classes.transfers}>
        {loading.isLoadingTransfers ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : // <TransfersList transfers={data.transfers} />
        isNewDesign() ? (
          transfers.data.map((transfer, i) => <TripCardComponent key={i} transfer={transfer} />)
        ) : (
          transfers.data.map((transfer, i) => <Transfer key={i} transfer={transfer} />)
        )}
        {transfers.data.length === 0 && filters.isFilterApply && (
          <Alert severity="warning">{i18n.t("NothingFound")}</Alert>
        )}
        {transfers.msg && <Alert severity="error">{transfers.msg}</Alert>}
      </div>
      <div style={{ width: "200px", margin: "10px auto", textAlign: "center" }}>
        {transfers.data.length !== 0 && transfers.isNext && !filters.isFilterApply && (
          <LoadingButton
            variant="contained"
            loading={loading.isLoadingNextTransfers}
            onClick={addNextHandler}
          >
            {i18n.t("LoadMore")}
          </LoadingButton>
        )}
      </div>
    </Container>
  );
}
