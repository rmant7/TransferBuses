import { useParams } from "react-router";

export default function TransferViewComponent() {
  const { trip } = useParams();

  console.log("TransferViewComponent", JSON.parse(trip));

  return <div>{JSON.parse(trip).date}</div>;
}
