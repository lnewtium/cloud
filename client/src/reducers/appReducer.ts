import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
  loader: boolean;
  search: boolean;
}

const initialState: IInitialState = {
  loader: false,
  search: false,
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
    setSearch: (state, action: PayloadAction<boolean>) => {
      state.search = action.payload;
    },
  },
});

export const { showLoader, hideLoader, setSearch } = appSlice.actions;
export default appSlice.reducer;
