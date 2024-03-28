import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from './../redux/slices/playStoreModalSlice';

const usePlayStoreModal = () => {
  const { open } = useSelector((state) => state.playStoreModal);
  const dispatch = useDispatch();

  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    navigator.userAgent.indexOf('Android') === -1 ? dispatch(closeModal()) : null;
  }, []);

  const handleClose = () => dispatch(closeModal());
  const sxForCloseBtn = {
    position: 'absolute',
    right: 8,
    top: 8,
    color: (theme) => theme.palette.grey[500],
  };

  return { open, handleClose, sxForCloseBtn };
};

export default usePlayStoreModal;
