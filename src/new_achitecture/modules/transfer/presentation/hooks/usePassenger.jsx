import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getLoading,
  getTransfersData,
} from '../../../trip_search/presentation/redux/reducers/selectors';
import {
  getNextTransfersAction,
  getTransfersAction,
} from '../../../trip_search/presentation/redux/reducers/actions/transfers-actions';

const usePassenger = () => {
  const dispatch = useDispatch();
  // const [transfers, setTransfers] = useState([]);
  // const [loading, setLoading] = useState();
  const data = useSelector(getTransfersData);
  const loading = useSelector(getLoading);

  const addNextHandler = () => {
    dispatch(getNextTransfersAction(data.transfers));
  };

  useEffect(() => {
    dispatch(getTransfersAction());
  }, [dispatch]);

  return {data, addNextHandler, loading};
};

export default usePassenger;
