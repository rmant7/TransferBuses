import {useEffect, useState} from "react";
import {getTransfers} from "../../services/data-service";
import TransfersList from "../TransfersList/TransfersList";

export default function PassengerPage() {
    const [transfers, setTransfers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(true);
        getTransfers().then((response) => {
            setTransfers(response);
        });
        setLoading(false);
    }, []);

    return (
        <div className="PassengerPage">
            {loading && <h2>Loading...</h2>}
            {!loading && <TransfersList transfers={transfers}/>}

        </div>
    );
}

