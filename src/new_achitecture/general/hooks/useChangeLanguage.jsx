import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const useChangeLanguage = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n
      .changeLanguage(language)
      .then()
      .catch((err) => console.error('error ', err));
  };
  i18n.reloadResources().then();
  const lang = useSelector((state) => state.app.lang);
  useEffect(() => {
    changeLanguage(lang);
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps
  return {i18n, lang};
};

export default useChangeLanguage;
