import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getLoading, getTransfersData} from "../../../../general/redux/selectors";
import {getNextTransfers} from "../../../trip_search/data/api/data-service";
import {getTransfersAction} from "../../../../general/redux/redux-using functions/transfers-actions";

const usePassenger = () => {
  const dispatch = useDispatch();
  // const [transfers, setTransfers] = useState([]);
  // const [loading, setLoading] = useState();
  const data = useSelector(getTransfersData);
  const loading = useSelector(getLoading);

  const addNextHandler = () => {
    dispatch(getNextTransfers(data.transfers));
  };

  useEffect(() => {
    dispatch(getTransfersAction());
  }, [dispatch]);

  return {data, addNextHandler, loading};
};

export default usePassenger;
