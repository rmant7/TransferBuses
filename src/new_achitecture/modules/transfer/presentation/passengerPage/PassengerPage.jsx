import { Box, Container, LinearProgress, Typography } from '@material-ui/core';
import i18next from 'i18next';
import Transfer from '../transferPage/Transfer';
import filtersClasses from '../../../../modules/trip_search/lib/filterSearch/Filter/FilterComponent.module.css';
import classes from './PassengerPage.module.css';
import TransferCardComponent from '../transferPage/transferCard/TransferCardComponent';
import { LoadingButton } from '@mui/lab';
import { Alert } from '@mui/material';
import i18n from '../../../../../i18n';
import { PAGE_SIZE } from '../../../trip_search/data/api/data-service';
import FiltersCitiesFrom from '../../../trip_search/lib/filterSearch/Filter/FiltersCitiesFrom';
import usePassenger from '../hooks/usePassenger';
import {Link} from "react-router-dom";

function isNewDesign() {
  return (
    process.env.REACT_APP_NEW_DESIGN &&
    process.env.REACT_APP_NEW_DESIGN === 'true'
  );
}

export default function PassengerPage() {
  const { data, addNextHandler, loading } = usePassenger();

  const handleClick = () => {
    addNextHandler();
  };

  return (
    <Container maxWidth='xl' className={classes.tb_padding}>

      <div className={filtersClasses.filters_sector}>
          <div style={{marginBottom: '15px'}}>
              <Link to={'/viewRoutes'} className={classes.btn}>I'm a passenger</Link>
              <Link to={'/addTransfer'} className={classes.btn}>I'm a carrier</Link>
          </div>

        <Typography variant='button' display='block' gutterBottom>
          {i18next.t('Filter')}
        </Typography>
        <FiltersCitiesFrom />
      </div>
      {/* <Divider style={{margin: "10px"}}/> */}
      {/* {loading && <h2>Loading...</h2>} */}
      {/* {!loading && <transfersList transfers={transfers} />} */}
      <div className={classes.transfers}>
        {loading.isLoadingTransfers ? (
          <Box sx={{ width: '100%' }}>
            <LinearProgress />
          </Box>
        ) : // <transfersList transfers={data.transfers} />
        isNewDesign() ? (
          data.transfers.map((transfer, i) => (
            <TransferCardComponent key={i} transfer={transfer} />
          ))
        ) : (
          data.transfers.map((transfer, i) => (
            <Transfer key={i} transfer={transfer} />
          ))
        )}
        {data.transfers.length === 0 && data.isFilterApply && (
          <Alert severity='warning'>{i18n.t('NothingFound')}</Alert>
        )}
      </div>
      <div style={{ width: '200px', margin: '10px auto', textAlign: 'center' }}>
        {data.nextTransfers.length === PAGE_SIZE &&
          data.transfers.length !== 0 &&
          !data.isFilterApply && (
            <LoadingButton
              variant='contained'
              loading={loading.isLoadingNextTransfers}
              onClick={handleClick}
            >
              {i18n.t('LoadMore')}
            </LoadingButton>
          )}
      </div>
    </Container>
  );
}
