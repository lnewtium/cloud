import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import fileReducer from './fileReducer';
import uploadReducer from './uploadReducer';
import appReducer from './appReducer';

export const store = configureStore({
    reducer: {
        user: userReducer,
        files: fileReducer,
        upload: uploadReducer,
        app: appReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ["upload/uploadFile"],
                // Ignore these paths in the state
                ignoredPaths: ['upload.uploadedFile.content'],
            },
        }),
});