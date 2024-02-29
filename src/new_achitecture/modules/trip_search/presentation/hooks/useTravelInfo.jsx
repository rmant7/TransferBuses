import React, { useState, useEffect } from 'react';
import { useMediaQuery } from '@material-ui/core';
import { resultItemStyle } from '../components/searchResult/style';

const useTravelInfo = (travelInfo) => {
  const style = useMediaQuery('(max-width:650px)')
    ? resultItemStyle.sm
    : resultItemStyle.lg;

  const lessThan480 = useMediaQuery('(max-width:480px)');

  const [additionalInfoOpened, setAdditionalInfoOpened] = useState(false);
  const [additionalInformation, setAdditionalInformation] = useState(null);

  useEffect(() => {
    // import(`../../cheapTripData/inner_jsons/${travelInfo.route}.json`)
    import(`../../data/jsons/cheapTripData/${travelInfo.route}.json`)
      .then((res) => setAdditionalInformation(res.default))
      .catch((_) => null);
  }, [travelInfo.route]);

  return { style, lessThan480, additionalInfoOpened, additionalInformation, setAdditionalInfoOpened };
};

export default useTravelInfo;
