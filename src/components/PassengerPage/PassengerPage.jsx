import { useEffect } from "react";
import { Box, Container, LinearProgress, Typography } from "@material-ui/core";
import i18next from "i18next";
import FiltersCitiesFrom from "../FiltersCitysFrom/FiltersCitiesFrom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTransfersAction } from "../../redux/actions/transfers-actions";
import { getLoading, getTransfersData } from "../../redux/selectors";
import Transfer from "../Transfer/Transfer";
import filtersClasses from "../Filter/FilterComponent.module.css";
import classes from "./PassengerPage.module.css";
import { useStyles } from "../../utils/useStyles";
import TransfersList from "../TransfersList/TransfersList";
import TransferCardComponent from "../TransferCard/TransferCardComponent";
// import "./PassengerPage.css";

export default function PassengerPage() {
  const dispatch = useDispatch();
  // const [transfers, setTransfers] = useState([]);
  // const [loading, setLoading] = useState();
  const data = useSelector(getTransfersData);
  const loading = useSelector(getLoading).isLoadingTransfers;

  console.log(data);

  useEffect(() => {
    dispatch(getTransfersAction());
  }, [dispatch]);

  return (
    <Container maxWidth="xl" className={filtersClasses.top_padding}>
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
        {loading && !data.isReceived ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        ) : (
          // <TransfersList transfers={data.transfers} />
          data.transfers.map((transfer) => <Transfer key={transfer.id} transfer={transfer} />)
          // data.transfers.map((transfer, i) => <TransferCardComponent transfer={transfer} id={i} />)
        )}
      </div>
    </Container>
  );
}
