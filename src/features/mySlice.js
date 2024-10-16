import { createSlice } from '@reduxjs/toolkit';
import myReducer from '../features/mySlice';

const mySlice = createSlice({
    name: 'myFeature',
    initialState: {},
    reducers: {
        // Reducer functions
    },
});

export default mySlice.reducer;  // Ensure you're exporting the reducer
