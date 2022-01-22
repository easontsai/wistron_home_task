import { createSlice } from '@reduxjs/toolkit';
import { getForecast } from '../../resource';

export const weatherTableSlice = createSlice({
  name: 'weatherTable',
  initialState: {
    weatherForecast: {},
    selectedRowIdxs: [],
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setWeatherForecast: (state, action) => {
      state.weatherForecast = action.payload;
    },
    setSelectedRowIdxs: (state, action) => {
      state.selectedRowIdxs = action.payload;
    },
    setSelectedAllRowIdxs: (state, action) => {
      const isSelectAll = action.payload;
      if (isSelectAll) {
        const { records } = state.weatherForecast;
        const ret = [];
        records?.location.forEach((item, idx) => {
          ret.push(idx);
        });
        state.selectedRowIdxs = ret;
      } else {
        state.selectedRowIdxs = [];
      }
    },
  },
});

export const { setWeatherForecast, setSelectedRowIdxs, setSelectedAllRowIdxs } =
  weatherTableSlice.actions;

export const getForecastAsync = () => async dispatch => {
  const data = await getForecast();
  dispatch(setWeatherForecast(data));
};
export default weatherTableSlice.reducer;
