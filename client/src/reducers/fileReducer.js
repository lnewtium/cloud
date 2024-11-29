import { createSlice } from '@reduxjs/toolkit';

const fileSlice = createSlice({
    name: 'file',
    initialState: {
        files: [],
        currentDir: null,
        popupDisplay: 'none',
        dirStack: [],
        view: 'list'
    },
    reducers: {
        setFiles: (state, action) => {
            state.files = action.payload;
        },
        setCurrentDir: (state, action) => {
            state.currentDir = action.payload;
        },
        addFile: (state, action) => {
            state.files.push(action.payload);
        },
        setPopupDisplay: (state, action) => {
            state.popupDisplay = action.payload;
        },
        pushToStack: (state, action) => {
            state.dirStack.push(action.payload);
        },
        deleteFile: (state, action) => {
            state.files = state.files.filter(file => file.id !== action.payload);
        },
        setFileView: (state, action) => {
            state.view = action.payload;
        }
    }
});

export const { setFiles, setCurrentDir, addFile, setPopupDisplay, pushToStack, deleteFile, setFileView } = fileSlice.actions;
export default fileSlice.reducer;