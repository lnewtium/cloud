import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFile, IFolder } from "@/types/file";

export type UploadFileType = { name: string, content: string | ArrayBuffer, dir: IFolder | null }

export type FileInUploader = { name: string, progress: number, id: number }

interface IInitialState {
  isVisible: boolean,
  askPass: boolean,
  cryptPass: string,
  uploadFile: null | UploadFileType,
  downloadFile: null | IFile,
  currentAction: string,
  files: FileInUploader[]
}

const initialState: IInitialState = {
  isVisible: false,
  askPass: false,
  cryptPass: "",
  uploadFile: null,
  downloadFile: null,
  currentAction: "",
  files: []
};

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    showUploader: (state) => {
      state.isVisible = true;
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
    addUploadFile: (state, action: PayloadAction<FileInUploader>) => {
      state.files.push(action.payload);
    },
    removeUploadFile: (state, action: PayloadAction<FileInUploader>) => {
      state.files = state.files.filter(file => file.id !== action.payload.id);
    },
    changeUploadFile: (state, action: PayloadAction<FileInUploader>) => {
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
  setDownloadFile,
  setUploadFile,
  setCurrentAction
} = uploadSlice.actions;
export default uploadSlice.reducer;