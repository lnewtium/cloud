import axios from "axios";
import { addFile, setFiles, deleteFile as deleteFileAction } from "@/reducers/fileReducer";
import {
  addUploadFile,
  changeUploadFile,
  showAskPass,
  showUploader,
  setCurrentAction,
  setUploadFile,
  setDownloadFile, UploadFileType, FileInUploader
} from "@/reducers/uploadReducer";
import { hideLoader, showLoader } from "@/reducers/appReducer";
import { API_URL } from "@/config";
import { decryptData, encryptData } from "@/utils/crypto";
import { DispatchType } from "@/reducers";
import { IFile, IFileResponse, IFolder, IFolderResponse } from "@/types/file";

const remapFile = (file: IFileResponse) => ({ ...file, progress: 0 } as IFile);
const remapFolder = remapFile as (folder: IFolderResponse) => IFolder;

export function getFiles(dir: IFolder | null, sort?: string) {
  return async (dispatch: DispatchType) => {
    try {
      dispatch(showLoader());
      let url = `${API_URL}api/files`;
      if (dir) {
        url = `${API_URL}api/files?parent=${dir.id}`;
      }
      if (sort) {
        url = `${API_URL}api/files?sort=${sort}`;
      }
      if (dir && sort) {
        url = `${API_URL}api/files?parent=${dir.id}&sort=${sort}`;
      }
      const response = await axios.get<IFileResponse[]>(url, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      dispatch(setFiles(response.data.map(remapFile)));
    } catch (e) {
      // @ts-ignore
      alert(e?.response?.data?.message);
    } finally {
      dispatch(hideLoader());
    }
  };
}

export function createDir(name: string, dir: IFolder | null) {
  return async (dispatch: DispatchType) => {
    try {
      const response = await axios.post<IFolderResponse>(`${API_URL}api/files`, {
        name,
        parent: (dir ? dir.id : null)
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      dispatch(addFile(remapFolder(response.data)));
    } catch (e) {
      // @ts-ignore
      alert(e?.response?.data?.message);
    }
  };
}

export function uploadFile(file: File, dir: IFolder | null) {
  return async (dispatch: DispatchType) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (dir) {
        formData.append("parent", String(dir.id));
      }
      const reader = new FileReader();
      reader.onload = evt => {
        dispatch(setCurrentAction("upload"));
        dispatch(setUploadFile({ name: file.name, content: evt.target?.result!, dir: dir }));
        dispatch(showAskPass());
      };
      reader.readAsArrayBuffer(file);
    } catch (e) {
      // @ts-ignore
      alert(e?.response?.data?.message);
    }
  };
}

export function uploadFileEncrypted(fileProps: UploadFileType, key: string) {
  return async (dispatch: DispatchType) => {
    try {
      const file = new File([(await encryptData(fileProps.content as ArrayBuffer, key)).ciphertext], fileProps.name);
      const formData = new FormData();
      formData.append("file", file);
      if (fileProps.dir) {
        formData.append("parent", String(fileProps.dir.id));
      }
      const uploadFile: FileInUploader = { name: file.name, progress: 0, id: Date.now() };
      dispatch(showUploader());
      dispatch(addUploadFile(uploadFile));
      const response = await axios.post<IFileResponse>(`${API_URL}api/files/upload`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        onUploadProgress: progressEvent => {
          dispatch(changeUploadFile({ ...uploadFile, progress: Math.round((progressEvent.progress! * 100)) }));
        }
      });
      dispatch(addFile(remapFile(response.data)));
    } catch (e) {
      // @ts-ignore
      alert(e?.response?.data?.message);
    }
  };
}


export function downloadFile(file: IFile) {
  axios.get(`${API_URL}api/files/download?id=${file.id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    responseType: "blob"
  }).then(response => {
    if (response.status === 200) {
      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
  });
}

export function askForDecryptPass(file: IFile) {
  return async (dispatch: DispatchType) => {
    dispatch(setCurrentAction("download"));
    dispatch(setDownloadFile(file));
    dispatch(showAskPass());
  };
}

export const decryptFile = async (file: IFile, key: string) => {
  const response = await axios.get(`${API_URL}api/files/download?id=${file.id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    responseType: "blob"
  });
  if (response.status === 200) {
    const blob = new Blob([response.data]);
    const decrypted = await decryptData(await blob.arrayBuffer(), key);
    const downloadUrl = window.URL.createObjectURL(new Blob([decrypted.data], { type: "application/octet-stream" }));
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};

export function deleteFile(file: IFile) {
  type IRes = { message: string }
  return async (dispatch: DispatchType) => {
    try {
      const response = await axios.delete<IRes>(`${API_URL}api/files?id=${file.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      dispatch(deleteFileAction(file));
      alert(response.data.message);
    } catch (e) {
      // @ts-ignore
      alert(e?.response?.data?.message);
    }
  };
}

export function searchFiles(search: string) {
  return async (dispatch: DispatchType) => {
    try {
      const response = await axios.get<IFileResponse[]>(`${API_URL}api/files/search?search=${search}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      dispatch(setFiles(response.data.map(remapFile)));
    } catch (e) {
      // @ts-ignore
      alert(e?.response?.data?.message);
    } finally {
      dispatch(hideLoader());
    }
  };
}
