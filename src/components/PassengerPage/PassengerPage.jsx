import { useEffect, useState } from "react";
import { getTransfers } from "../../services/data-service";
import TransfersList from "../TransfersList/TransfersList";
import { Box, Container, LinearProgress } from "@material-ui/core";
import { useStyles } from "../../utils/useStyles";
// import "./PassengerPage.css";

export default function PassengerPage() {
    const classes = useStyles();
    const [transfers, setTransfers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTransfers().then((response) => {
            setTransfers(response);
            setLoading(false);
        });
    }, [setLoading, setTransfers]);

    return (
        <Container maxWidth="xl" className={classes.topPadding}>
            {/* {loading && <h2>Loading...</h2>} */}
            {/* {!loading && <TransfersList transfers={transfers} />} */}
            {loading ? (
                <Box sx={{ width: "100%" }}>
                    <LinearProgress />
                </Box>
            ) : (
                <TransfersList
                    transfers={transfers}
                />
            )}
        </Container>
    );
}
