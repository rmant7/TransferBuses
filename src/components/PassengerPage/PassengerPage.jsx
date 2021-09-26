import { useEffect } from "react";
import TransfersList from "../TransfersList/TransfersList";
import { Box, Container, LinearProgress, Typography } from "@material-ui/core";
import { useStyles } from "../../utils/useStyles";
import i18next from "i18next";
import filtersClasses from "../Filter/FilterComponent.module.css";
import FiltersCitiesFrom from "../FiltersCitysFrom/FiltersCitiesFrom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getTransfersAction } from "../../redux/actions/transfersActions";
import { getTransfersData, selectFilter } from "../../redux/selectors";
// import "./PassengerPage.css";

export default function PassengerPage() {
    const classes = useStyles();
    const dispatch = useDispatch();
    // const [transfers, setTransfers] = useState([]);
    // const [loading, setLoading] = useState();
    const data = useSelector(getTransfersData);
    const selectedCityId = useSelector(selectFilter);

    console.log(data, selectedCityId);

    useEffect(() => {
        dispatch(getTransfersAction());
    }, [dispatch]);

    return (
        <Container maxWidth="xl" className={classes.topPadding}>
            <div className={filtersClasses.filters_sector}>
                <Typography variant="button" display="block" gutterBottom>
                    {i18next.t("Filter")}
                </Typography>
                <FiltersCitiesFrom name={i18next.t("From City")} />
            </div>
            {/* {loading && <h2>Loading...</h2>} */}
            {/* {!loading && <TransfersList transfers={transfers} />} */}
            {!data.isReceived ? (
                <Box sx={{ width: "100%" }}>
                    <LinearProgress />
                </Box>
            ) : (
                <TransfersList transfers={data.transfers} />
            )}
        </Container>
    );
}
