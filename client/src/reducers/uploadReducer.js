import {createSlice} from '@reduxjs/toolkit';

const uploadSlice = createSlice({
    name: 'upload',
    initialState: {
        isVisible: false,
        askPass: false,
        cryptPass: "",
        uploadedFile: {},
        currentAction: "",
        files: []
    },
    reducers: {
        showUploader: (state) => {
            // state.isVisible = true;
        },
        hideUploader: (state) => {
            state.isVisible = false;
        },
        showAskPass: (state) => {
            state.askPass = true;
        },
        hideAskPass: (state) => {
            state.askPass = false;
        },
        uploadFile: (state, action) => {
            state.uploadedFile = action.payload;
        },
        setCryptPass: (state, action) => {
            state.cryptPass = action.payload;
        },
        setCurrentAction: (state, action) => {
            state.currentAction = action.payload;
        },
        addUploadFile: (state, action) => {
            state.files.push(action.payload);
        },
        removeUploadFile: (state, action) => {
            state.files = state.files.filter(file => file.id !== action.payload);
        },
        changeUploadFile: (state, action) => {
            const file = state.files.find(file => file.id === action.payload.id);
            if (file) {
                file.progress = action.payload.progress;
            }
        }
    }
});

export const {
    showUploader,
    hideUploader,
    addUploadFile,
    removeUploadFile,
    changeUploadFile,
    showAskPass,
    hideAskPass,
    setCryptPass,
    uploadFile,
    setCurrentAction
} = uploadSlice.actions;
export default uploadSlice.reducer;