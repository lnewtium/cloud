import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  loader: boolean;
}

const initialState: IInitialState = {
  loader: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    showLoader: state => {
      state.loader = true;
    },
    hideLoader: state => {
      state.loader = false;
    },
  },
});

export const { showLoader, hideLoader } = appSlice.actions;
export default appSlice.reducer;
