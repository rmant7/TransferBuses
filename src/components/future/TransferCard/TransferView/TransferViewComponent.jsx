import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { getTransfers } from "../../../../redux/selectors";

export default function TransferViewComponent() {
  const { id } = useParams();
  const transfers = useSelector(getTransfers);

  console.log(id);
  console.log(transfers);
  console.log(transfers.data.find((item) => item._id === id));

  return (
    <div style={{ margin: "100px auto", width: "95%" }}>
      {transfers.data ? null : transfers.data.find((i) => i._id === id).date}
    </div>
  );
}
