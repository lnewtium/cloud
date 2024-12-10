import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "@/types/user";

interface IInitialState {
  currentUser: IUser | {};
  isAuth: boolean;
}

// Initial state
const initialState: IInitialState = {
  currentUser: {},
  isAuth: false,
};

// Create slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Set user action
    setUser: (state, action: PayloadAction<IUser>) => {
      state.currentUser = action.payload;
      state.isAuth = true;
    },
    // Logout action
    logout: state => {
      localStorage.removeItem("token");
      state.currentUser = {};
      state.isAuth = false;
    },
  },
});

// Export actions
export const { setUser, logout } = userSlice.actions;

// Export reducer to be used in store
export default userSlice.reducer;
