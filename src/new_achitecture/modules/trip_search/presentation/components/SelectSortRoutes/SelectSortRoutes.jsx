import { InputLabel, MenuItem, Select } from '@material-ui/core'
import React from 'react'
import { SORT_OPTIONS } from '../../../domain/entites/utils/constants/sortConstants'
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from './../../redux/reducers/cheapTripSearch/cheapTripSearchSlice';


const SelectSortRoutes = () => {

  const { filterBy } = useSelector((state) => {
    return state.cheapTripSearch;
  });
  const dispatch = useDispatch();

  const selectSortBy = (value) => {
    dispatch(setFilter(value));
  };
  
  const handleSelectSortBy = (event) => {
    selectSortBy(event.target.value);
  };
  return (
    <>
            <InputLabel id='demo-simple-select-label'>Sort</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={filterBy}
              label='Sort'
              onChange={handleSelectSortBy}
            >
              {SORT_OPTIONS.map((item, index) => (
                <MenuItem value={item} key={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </>
  )
}

export default SelectSortRoutes