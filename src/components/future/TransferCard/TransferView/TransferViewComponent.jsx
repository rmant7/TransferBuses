import { LinearProgress } from "@material-ui/core";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getTransferAction } from "../../../../redux/actions/transfer-actions";
import { getLoading, getTransfer } from "../../../../redux/selectors";
import { getCityById } from "../../../../utils/cities";

export default function TransferViewComponent() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const transfer = useSelector(getTransfer);
  const loading = useSelector(getLoading);

  useEffect(() => {
    dispatch(getTransferAction(id));
  }, [dispatch, id]);

  console.log(id);
  console.log(loading);
  console.log(transfer);

  return (
    <div style={{ margin: "100px auto", width: "95%" }}>
      {loading.isLoadingTransfer ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : transfer.isReceived ? (
        <div>
          <p>From City: {getCityById(transfer.data.from).name}</p>
          <p>To City: {getCityById(transfer.data.to).name}</p>
          <p>Date: {transfer.data.date}</p>
          <p>Departure time: {transfer.data.departureTime}</p>
          <p>Duration: {transfer.data.duration}</p>
          <p>isPetsAllowed: {transfer.data.isPetsAllowed}</p>
          <p>passAParcel: {transfer.data.passAParcel}</p>
          <p>phoneNumber: {transfer.data.phoneNumber}</p>
          <p>
            price: {transfer.data.price} {transfer.data.currency}
          </p>
          <p>regularTrips: {transfer.data.regularTrips}</p>
          <p>Additional info: {transfer.data.additionalInfo}</p>
        </div>
      ) : null}
    </div>
  );
}
