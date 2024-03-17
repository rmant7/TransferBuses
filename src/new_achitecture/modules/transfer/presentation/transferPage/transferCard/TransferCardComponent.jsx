import classes from './TransferCardComponent.module.css';
import i18n from 'i18next';
import { getCityById } from '../../../../trip_search/lib/filterSearch/cities/cities';
import { Button, Divider } from '@material-ui/core';
import { PASSENGER_ROUTE } from '../../../../trip_search/domain/entites/utils/constants/constants';
import ArrowIcon from '../../../../../general/assets/upward-arrow.png';
import ScheduleIcon from '../../../../../general/assets/schedule.png';
import PetsAllowedIcon from '../../../../../general/assets/pets-allowed.png';
import ParcelIcon from '../../../../../general/assets/parcel.png';
import WalletIcon from '../../../../../general/assets/wallet.png';
import TimingIcon from '../../../../../general/assets/timing.png';
import { months_en } from '../../../../trip_search/domain/entites/utils/months/months-util';
import useTransfer from '../../hooks/useTransfer';

export default function TransferCardComponent({ transfer, id }) {
  const { priceToDisplay, history } = useTransfer(transfer, id);

  return (
    <div className={classes.transfer_card}>
      <div className={classes.transfer_card_header}>
        <div className={classes.way}>
          <span className={classes.text}>
            {getCityById(transfer.from).name}
          </span>
          <img src={ArrowIcon} className={classes.arrow_icon} alt='icon' />
          <span className={classes.text}>{getCityById(transfer.to).name}</span>
        </div>
      </div>
      <Divider variant='middle' style={{ margin: '10px' }} />
      <div className={classes.content}>
        <div className={classes.icon_text}>
          <img src={ScheduleIcon} className={classes.icon_style} alt='icon' />
          {!transfer.regularTrips ? (
            <div className={classes.text}>
              {new Date(transfer.date).getDate()}{' '}
              {months_en[new Date(transfer.date).getMonth()]}{' '}
              {new Date(transfer.date).getFullYear()}
            </div>
          ) : (
            <span className={classes.text}>{i18n.t('Regular trips')}</span>
          )}
        </div>
        <div className={classes.icon_text}>
          <img src={TimingIcon} className={classes.icon_style} alt='icon' />
          <span className={classes.text}>{transfer.duration}</span>
        </div>
        <div className={classes.icon_text}>
          <img src={WalletIcon} className={classes.icon_style} alt='icon' />
          <span className={classes.text}>{priceToDisplay}</span>
        </div>
        {transfer.passAParcel && (
          <img src={ParcelIcon} className={classes.icon_style} />
        )}
        {transfer.isPetsAllowed && (
          <img src={PetsAllowedIcon} className={classes.icon_style} />
        )}
      </div>
      <Divider variant='middle' style={{ margin: '10px' }} />
      <div className={classes.transfer_card_footer}>
        <Button
          size='medium'
          color='primary'
          variant='contained'
          onClick={() =>
            history.push(`${PASSENGER_ROUTE}/${JSON.stringify(transfer)}`)
          }
          style={{ marginRight: '0', marginLeft: 'auto' }}
        >
          {i18n.t('More')}
        </Button>
      </div>
    </div>
  );
}
