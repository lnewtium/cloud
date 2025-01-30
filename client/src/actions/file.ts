import axios from "axios";
import {
  addFile,
  setFiles,
  deleteFile as deleteFileAction,
  setPopupDisplay,
} from "@/reducers/fileReducer";
import {
  showAskPass,
  setCurrentAction,
  setUploadFile,
  setDownloadFile,
  UploadFileType,
} from "@/reducers/cryptReducer";
import { hideLoader, setSearch, showLoader } from "@/reducers/appReducer";
import { API_URL } from "@/config";
import { decryptData, encryptData } from "@/utils/crypto";
import { DispatchType } from "@/reducers";
import { IFile, IFolder } from "@/types/file";

export function getFiles(dir: IFolder | null, sort?: string) {
  return async (dispatch: DispatchType) => {
    try {
      dispatch(showLoader());
      const response = await axios.get<IFile[]>("/files", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        params: {
          parent: dir ? dir.id : null,
          sort,
        },
        baseURL: API_URL,
      });
      dispatch(setFiles(response.data));
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
      const response = await axios.post<IFolder>(
        "/files",
        {
          name,
          parent: dir ? dir.id : null,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          baseURL: API_URL,
        },
      );
      dispatch(addFile(response.data));
      dispatch(dispatch(setPopupDisplay("none")));
    } catch (e) {
      // @ts-ignore
      alert(e?.response?.data?.message);
    }
  };
}

export function uploadFile(file: File, dir: IFolder | null) {
  return async (dispatch: DispatchType) => {
    if (file.size > 10 * 1024 * 1024) {
      alert("File is too big (>10MB)");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      if (dir) {
        formData.append("parent", String(dir.id));
      }
      const reader = new FileReader();
      reader.onload = evt => {
        dispatch(setCurrentAction("upload"));
        dispatch(
          setUploadFile({
            name: file.name,
            content: evt.target?.result!,
            dir: dir,
          }),
        );
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
      const file = new File(
        [(await encryptData(fileProps.content as ArrayBuffer, key)).ciphertext],
        fileProps.name,
      );
      const formData = new FormData();
      formData.append("file", file);
      if (fileProps.dir) {
        formData.append("parent", String(fileProps.dir.id));
      }
      const response = await axios.post<IFile>("/files/upload", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        baseURL: API_URL,
      });
      dispatch(addFile(response.data));
    } catch (e) {
      // @ts-ignore
      alert(e?.response?.data?.message);
    }
  };
}

export function askForDecryptPass(file: IFile) {
  return async (dispatch: DispatchType) => {
    dispatch(setCurrentAction("download"));
    dispatch(setDownloadFile(file));
    dispatch(showAskPass());
  };
}

export const decryptFile = async (file: IFile, key: string) => {
  const response = await axios.get("/files/download", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    params: {
      id: file.id,
    },
    responseType: "blob",
    baseURL: API_URL,
  });
  if (response.status === 200) {
    const blob = new Blob([response.data]);
    const decrypted = await decryptData(await blob.arrayBuffer(), key);
    const downloadUrl = window.URL.createObjectURL(
      new Blob([decrypted.data], { type: "application/octet-stream" }),
    );
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
};

export function deleteFile(file: IFile) {
  type IRes = { message: string };
  return async (dispatch: DispatchType) => {
    try {
      const response = await axios.delete<IRes>("/files", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          id: file.id,
        },
        baseURL: API_URL,
      });
      dispatch(deleteFileAction(file));
    } catch (e) {
      // @ts-ignore
      alert(e?.response?.data?.message);
    }
  };
}

export function searchFiles(search: string) {
  return async (dispatch: DispatchType) => {
    try {
      const response = await axios.get<IFile[]>("/files/search", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          search,
        },
        baseURL: API_URL,
      });
      dispatch(setSearch(true));
      dispatch(setFiles(response.data));
    } catch (e) {
      // @ts-ignore
      alert(e?.response?.data?.message);
    } finally {
      dispatch(hideLoader());
    }
  };
}
