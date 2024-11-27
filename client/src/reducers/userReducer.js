import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    currentUser: {},
    isAuth: false,
};

// Create slice
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Set user action
        setUser: (state, action) => {
            state.currentUser = action.payload;
            state.isAuth = true;
        },
        // Logout action
        logout: (state) => {
            localStorage.removeItem('token');
            state.currentUser = {};
            state.isAuth = false;
        },
    },
});

// Export actions
export const { setUser, logout } = userSlice.actions;

// Export reducer to be used in store
export default userSlice.reducer;