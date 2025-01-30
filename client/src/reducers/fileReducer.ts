import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFile, IFolder } from "@/types/file";

interface IInitialState {
  files: IFile[];
  currentDir: IFolder | null;
  popupDisplay: "flex" | "none";
  dirStack: (IFolder | null)[];
  view: "plate" | "list";
}

const initialState: IInitialState = {
  files: [],
  currentDir: null,
  popupDisplay: "none",
  dirStack: [],
  view: "plate",
};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFiles: (state, action: PayloadAction<IFile[]>) => {
      state.files = action.payload;
    },
    setCurrentDir: (state, action: PayloadAction<IFolder | null>) => {
      state.currentDir = action.payload;
    },
    addFile: (state, action: PayloadAction<IFile>) => {
      state.files.push(action.payload);
    },
    setPopupDisplay: (state, action: PayloadAction<"flex" | "none">) => {
      state.popupDisplay = action.payload;
    },
    pushToStack: (state, action: PayloadAction<IFolder>) => {
      state.dirStack.push(action.payload);
    },
    popStack: state => {
      state.dirStack.pop();
    },
    deleteFile: (state, action: PayloadAction<IFile>) => {
      state.files = state.files.filter(file => file.id !== action.payload.id);
    },
    setFileView: (state, action: PayloadAction<"plate" | "list">) => {
      state.view = action.payload;
    },
  },
});

export const {
  setFiles,
  setCurrentDir,
  addFile,
  setPopupDisplay,
  pushToStack,
  popStack,
  deleteFile,
  setFileView,
} = fileSlice.actions;
export default fileSlice.reducer;
