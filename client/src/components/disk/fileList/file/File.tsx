import React, { MouseEvent } from "react";
import "./file.less";
import dirLogo from "@/assets/img/dir.svg";
import fileLogo from "@/assets/img/file.svg";
import { pushToStack, setCurrentDir } from "@/reducers/fileReducer";
import { askForDecryptPass, deleteFile, downloadFile } from "@/actions/file";
import sizeFormat from "@/utils/sizeFormat";
import { StyledButton } from "@/components/Button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import { IFile, IFolder } from "@/types/file";

const File = ({ file }) => {
  const dispatch = useAppDispatch();
  const currentDir = useAppSelector(state => state.files.currentDir);
  const fileView = useAppSelector(state => state.files.view);

  function openDirHandler(file: IFile) {
    if (file.type === "Folder") {
      if (currentDir)
        dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file as IFolder));
    }
  }

  function downloadClickHandler(e: MouseEvent) {
    e.stopPropagation();
    downloadFile(file);
  }

  function decryptClickHandler(e: MouseEvent) {
    e.stopPropagation();
    dispatch(askForDecryptPass(file));
  }

  function deleteClickHandler(e: MouseEvent) {
    e.stopPropagation();
    dispatch(deleteFile(file));
  }

  if (fileView === "list") {
    return (
      <div className="group file" onClick={() => openDirHandler(file)}>
        <img src={file.type === "Folder" ? dirLogo : fileLogo} alt="" className="file__img" />
        <div className="file__name">{file.name}</div>
        <div className="file__date">{file.date.slice(0, 10)}</div>
        <div className="file__size">{sizeFormat(file.size)}</div>
        {file.type !== "Folder" &&
          <div style={{ display: "flex" }}>
            <StyledButton onClick={e => downloadClickHandler(e)} className="file__btn file__download">Download with encryption
            </StyledButton>
            <StyledButton onClick={e => decryptClickHandler(e)} className="file__btn file__download">Decrypt
            </StyledButton>
          </div>
        }
        <StyledButton onClick={(e) => deleteClickHandler(e)} className="file__btn file__delete">Delete</StyledButton>
      </div>
    );
  }
  if (fileView === "plate") {
    return (
      <div className="file-plate" onClick={() => openDirHandler(file)}>
        <img src={file.type === "Folder" ? dirLogo : fileLogo} alt="" className="file-plate__img" />
        <div className="file-plate__name">{file.name}</div>
        <div className="file-plate__btns" style={{ display: "flex", flexDirection: "column" }}>
          {file.type !== "Folder" &&
            <StyledButton onClick={e => decryptClickHandler(e)}
                          className="file-plate__btn file-plate__download">Decrypt</StyledButton>}
          <StyledButton onClick={e => deleteClickHandler(e)}
                        className="file-plate__btn file-plate__delete">Delete</StyledButton>
        </div>
      </div>
    );
  }

};

export default File;
