import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userReducer";
import fileReducer from "./fileReducer.js";
import uploadReducer from "./uploadReducer";
import appReducer from "./appReducer.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    files: fileReducer,
    upload: uploadReducer,
    app: appReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["upload/setUploadFile"],
        // Ignore these paths in the state
        ignoredPaths: ["upload.uploadFile.content"]
      }
    })
});
export type StateType = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch