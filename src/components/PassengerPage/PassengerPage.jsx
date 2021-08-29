import { useEffect, useState } from "react";
import { getTransfers } from "../../services/data-service";
import TransfersList from "../TransfersList/TransfersList";
import { Grid, Container } from "@material-ui/core";
import { useStyles } from "../../utils/useStyles";
// import "./PassengerPage.css";

export default function PassengerPage() {
  const classes = useStyles();
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getTransfers().then(response => {
      setTransfers(response);
    });
    setLoading(false);
  }, []);

  return (
    <Container maxWidth="xl" className={classes.topPadding}>
      {loading && <h2>Loading...</h2>}
      {!loading && <TransfersList transfers={transfers} />}
    </Container>
  );
}
