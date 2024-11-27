import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
    name: 'app',
    initialState: {
        loader: false
    },
    reducers: {
        showLoader: (state) => {
            state.loader = true;
        },
        hideLoader: (state) => {
            state.loader = false;
        }
    }
});

export const { showLoader, hideLoader } = appSlice.actions;
export default appSlice.reducer;