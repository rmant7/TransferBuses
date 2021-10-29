import { Alert, LinearProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import i18n from "../../../i18n";
import { getFilters, getLoading, getTransfers } from "../../../redux/selectors";
import Filters from "../../Filters/Filters";
import TripCardComponent from "../TripCard/TripCardComponent";
import classes from "./Filters.module.css";

export default function FiltersComponent() {
  const loading = useSelector(getLoading);
  const transfers = useSelector(getTransfers);
  const filters = useSelector(getFilters);

  return (
    <>
      <div className={classes.filters_sector}>
        <span>{i18n.t("Filter")}</span>
        <Filters />
      </div>
      <div className={classes.items_to_view}>
        <div style={{ marginTop: "30px" }}>
          {loading.isLoadingTransfers ? (
            <Box sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          ) : (
            transfers.data.map((transfer, i) => <TripCardComponent key={i} transfer={transfer} />)
          )}
          {transfers.data.length === 0 && filters.isFilterApply && (
            <Alert severity="warning">{i18n.t("NothingFound")}</Alert>
          )}
        </div>
      </div>
    </>
  );
}
