import { createSlice } from '@reduxjs/toolkit';
import { getThirtySixHourForecast, getSunset } from '../../resource';

export const modalDetailSlice = createSlice({
  name: 'modalDetail',
  initialState: {
    modal: false,
    tirtySixHourForecast: {},
    sunset: {}
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setModal: (state, action) => {
      state.modal = action.payload;
    },
    setTirtySixHourForecast: (state, action) => {
      state.tirtySixHourForecast = action.payload
    },
    setSunset: (state, action) => {
      state.sunset = action.payload;
    },
  },
});

export const { setModal, setTirtySixHourForecast, setSunset } = modalDetailSlice.actions;

export const getThirtySixHourForecastAsync = () => async dispatch => {
  const ret = await getThirtySixHourForecast();
  dispatch(setTirtySixHourForecast(ret));
};

export const getSunsetAsync = () => async dispatch => {
  const ret = await getSunset();
  dispatch(setSunset(ret));
};

export default modalDetailSlice.reducer;
