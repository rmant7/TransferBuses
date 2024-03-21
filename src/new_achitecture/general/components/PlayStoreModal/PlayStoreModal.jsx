import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import usePlayStoreModal from '../../hooks/usePlayStoreModal';
import style from './PlayStoreModal.module.css';
import { PLAYSTORE_LINK } from './consts';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const PlayStoreModal = ({ open }) => {
  const { handleClose, sxForCloseBtn } = usePlayStoreModal();

  return (
    <Modal
      open={open}
      onClose={handleClose}
      disableAutoFocus
      aria-labelledby='Play Store modal'
      aria-describedby='Modal window with link to application in Google Play Store'
    >
      <Box className={style.wrapper}>
        <IconButton aria-label='close' onClick={handleClose} sx={sxForCloseBtn}>
          <CloseIcon />
        </IconButton>
        <div>
          <a
            className={style['store-icon']}
            href={PLAYSTORE_LINK}
            target='_blank'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='36'
              height='36'
              viewBox='0 0 36 36'
              fill='none'
            >
              <path
                d='M3.7558 3.20297C3.39335 3.57289 3.18359 4.14884 3.18359 4.89471V31.4994C3.18359 32.2453 3.39335 32.8212 3.7558 33.1911L3.84525 33.2723L19.1359 18.37V18.0181L3.84525 3.11575L3.7558 3.20297Z'
                fill='#E6700D'
              />
              <path
                d='M26.0776 23.34L20.9863 18.37V18.0181L26.0837 13.0482L26.1979 13.1128L32.2345 16.4617C33.9573 17.4121 33.9573 18.976 32.2345 19.9324L26.1979 23.2753L26.0776 23.34Z'
                fill='#E6700D'
              />
              <path
                d='M25.2733 24.2007L20.0617 19.1195L4.68164 34.1166C5.25384 34.7031 6.18695 34.7737 7.24807 34.1873L25.2733 24.2007Z'
                fill='#E6700D'
              />
              <path
                d='M25.2733 12.1876L7.24807 2.20103C6.18695 1.62058 5.25384 1.69125 4.68164 2.27772L20.0617 17.2688L25.2733 12.1876Z'
                fill='#E6700D'
              />
            </svg>
            <p className={style.btnText}>
              <span className={style.btnTextSpan}>Available on</span>Google Play
            </p>
          </a>
        </div>
      </Box>
    </Modal>
  );
};

export default PlayStoreModal;
