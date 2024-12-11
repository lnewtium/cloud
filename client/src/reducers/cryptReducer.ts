import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFile, IFolder } from "@/types/file";

export type UploadFileType = {
  name: string;
  content: string | ArrayBuffer;
  dir: IFolder | null;
};

interface IInitialState {
  isModalOpen: boolean;
  cryptPass: string;
  uploadFile: null | UploadFileType;
  downloadFile: null | IFile;
  currentAction: string;
}

const initialState: IInitialState = {
  isModalOpen: false,
  cryptPass: "",
  uploadFile: null,
  downloadFile: null,
  currentAction: "",
};

const cryptReducer = createSlice({
  name: "crypt",
  initialState,
  reducers: {
    showAskPass: state => {
      state.isModalOpen = true;
    },
    hideAskPass: state => {
      state.isModalOpen = false;
    },
    setUploadFile: (state, action: PayloadAction<UploadFileType>) => {
      state.uploadFile = action.payload;
    },
    setDownloadFile: (state, action: PayloadAction<IFile>) => {
      state.downloadFile = action.payload;
    },
    setCryptPass: (state, action: PayloadAction<string>) => {
      state.cryptPass = action.payload;
    },
    setCurrentAction: (state, action: PayloadAction<string>) => {
      state.currentAction = action.payload;
    },
  },
});

export const {
  showAskPass,
  hideAskPass,
  setCryptPass,
  setDownloadFile,
  setUploadFile,
  setCurrentAction,
} = cryptReducer.actions;
export default cryptReducer.reducer;
