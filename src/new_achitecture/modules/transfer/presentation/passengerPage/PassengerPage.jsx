import { useEffect } from "react";
import { Box, Container, LinearProgress, Typography } from "@material-ui/core";
import i18next from "i18next";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getNextTransfersAction, getTransfersAction } from "../../../trip_search/presentation/redux/reducers/actions/transfers-actions";
import { getLoading, getTransfersData } from "../../../trip_search/presentation/redux/reducers/selectors";
import Transfer from "../transferPage/Transfer";
import filtersClasses from "../../../../modules/trip_search/lib/filterSearch/Filter/FilterComponent.module.css";
import classes from "./PassengerPage.module.css";
import TransferCardComponent from "../transferPage/transferCard/TransferCardComponent";
import { LoadingButton } from "@mui/lab";
import { Alert } from "@mui/material";
import i18n from "../../../trip_search/domain/entites/utils/language/i18n";
import { PAGE_SIZE } from "../../../trip_search/data/api/data-service";
import FiltersCitiesFrom from "../../../trip_search/lib/filterSearch/Filter/FiltersCitiesFrom";
// import "./passengerPage.css";

function isNewDesign() {
  return process.env.REACT_APP_NEW_DESIGN && process.env.REACT_APP_NEW_DESIGN === "true";
}

export default function PassengerPage() {
  const dispatch = useDispatch();
  // const [transfers, setTransfers] = useState([]);
  // const [loading, setLoading] = useState();
  const data = useSelector(getTransfersData);
  const loading = useSelector(getLoading);

  console.log("PassengerPage", data);

  const addNextHandler = () => {
    dispatch(getNextTransfersAction(data.transfers));
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
      {/* {!loading && <transfersList transfers={transfers} />} */}
      <div className={classes.transfers}>
        {loading.isLoadingTransfers ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : // <transfersList transfers={data.transfers} />
        isNewDesign() ? (
          data.transfers.map((transfer, i) => <TransferCardComponent key={i} transfer={transfer} />)
        ) : (
          data.transfers.map((transfer, i) => <Transfer key={i} transfer={transfer} />)
        )}
        {data.transfers.length === 0 && data.isFilterApply && <Alert severity="warning">{i18n.t("NothingFound")}</Alert>}
      </div>
      <div style={{ width: "200px", margin: "10px auto", textAlign: "center" }}>
        {data.nextTransfers.length === PAGE_SIZE && data.transfers.length !== 0 && !data.isFilterApply && (
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
