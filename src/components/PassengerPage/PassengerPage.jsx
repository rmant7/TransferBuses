import { useEffect } from "react";
import { Box, Container, LinearProgress, Typography } from "@material-ui/core";
import i18next from "i18next";
import FiltersCitiesFrom from "../FiltersCitysFrom/FiltersCitiesFrom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getNextTransfersAction, getTransfersAction } from "../../redux/actions/transfers-actions";
import { getFilters, getLoading, getTransfers } from "../../redux/selectors";
import Transfer from "../Transfer/Transfer";
import filtersClasses from "../Filter/FilterComponent.module.css";
import classes from "./PassengerPage.module.css";
import { useStyles } from "../../utils/useStyles";
import TransferCardComponent from "../future/TransferCard/TransferCardComponent";
import { LoadingButton } from "@mui/lab";
import { Alert } from "@mui/material";
import i18n from "../../i18n";
import { MAX_PAGE_SIZE } from "../../utils/constants";
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
      <div className={filtersClasses.filters_sector}>
        <Typography variant="button" display="block" gutterBottom>
          {i18next.t("Filter")}
        </Typography>
        <FiltersCitiesFrom />
      </div>
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
          transfers.data.map((transfer, i) => <TransferCardComponent key={i} transfer={transfer} />)
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
