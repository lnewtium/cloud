import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import fileReducer from "./fileReducer.js";
import cryptReducer from "./cryptReducer";
import appReducer from "./appReducer.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    files: fileReducer,
    crypt: cryptReducer,
    app: appReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["crypt/setUploadFile"],
        // Ignore these paths in the state
        ignoredPaths: ["crypt.uploadFile.content"],
      },
    }),
});
export type StateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
