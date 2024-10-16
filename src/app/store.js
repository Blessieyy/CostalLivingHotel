import { configureStore } from '@reduxjs/toolkit';
import myReducer from '../features/mySlice'  // Update the path if needed


const store = configureStore({
  reducer: {
    // your reducers
  },
});

export default store;  // default export


