import { useEffect, useState } from "react";
import { getTransfers } from "../../services/data-service";
import TransfersList from "../TransfersList/TransfersList";
import { Box, Container, LinearProgress } from "@material-ui/core";
import { useStyles } from "../../utils/useStyles";
// import "./PassengerPage.css";
import FilterComponent from "../Filter/FilterComponent";
import { getCityById } from "../../utils/cities";
import { filters } from "../../utils/filters";

export default function PassengerPage() {
    const classes = useStyles();
    const [transfers, setTransfers] = useState([]);
    const [filteredTransfers, setFilteredTransfers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getTransfers().then((response) => {
            setTransfers(response);
            setLoading(false);
        });
    }, [setLoading, setTransfers]);

    const applyFilterFromCityHandler = (value) => {
        const tmp = transfers.filter((item) => {
            const cityName = getCityById(item.from).name;
            return cityName.includes(value);
        });
        console.log(transfers);
        setFilteredTransfers(tmp);
    };

    return (
        <Container maxWidth="xl" className={classes.topPadding}>
            {/* {loading && <h2>Loading...</h2>} */}
            {/* {!loading && <TransfersList transfers={transfers} />} */}
            {loading ? (
                <Box sx={{ width: "100%" }}>
                    <LinearProgress />
                </Box>
            ) : (
                <>
                    {filters.map((filter) => (
                        <FilterComponent
                            name={filter.category}
                            handler={applyFilterFromCityHandler}
                        />
                    ))}
                    <TransfersList
                        transfers={
                            filteredTransfers.length === 0
                                ? transfers
                                : filteredTransfers
                        }
                    />
                </>
            )}
        </Container>
    );
}
