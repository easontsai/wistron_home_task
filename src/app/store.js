import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import weatherTableReducer from '../features/weatherTable/WeatherTableSlice';
import modalDetailReducer from '../features/detail/ModalDetailSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    weatherTable: weatherTableReducer,
    modalDetail: modalDetailReducer,
  },
});
