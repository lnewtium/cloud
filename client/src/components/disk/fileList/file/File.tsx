import React, { MouseEvent } from "react";
import "./file.less";
import dirLogo from "@/assets/img/dir.svg";
import fileLogo from "@/assets/img/file.svg";
import { pushToStack, setCurrentDir } from "@/reducers/fileReducer";
import { askForDecryptPass, deleteFile } from "@/actions/file";
import sizeFormat from "@/utils/sizeFormat";
import { StyledButton } from "@/components/button/StyledButton";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import { IFile, IFolder } from "@/types/file";
import { File as FileIcon, Folder, LockKeyholeOpen, Trash2 } from "lucide-react";
import AnimatedButton from "@/components/button/AnimatedButton";

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
        {
          file.type === "Folder"
            ?
            <Folder size={40} />
            :
            <FileIcon size={40} />
        }
        <div className="file__name">{file.name}</div>
        <div className="file__date">{file.date.slice(0, 10)}</div>
        <div className="file__size">{sizeFormat(file.size)}</div>
        {file.type !== "Folder" &&
          <AnimatedButton text="Decrypt" onClick={decryptClickHandler}
                          className="hidden group-hover:col-start-5 group-hover:block">
            <LockKeyholeOpen />
          </AnimatedButton>
        }
        <AnimatedButton text="Delete" onClick={deleteClickHandler}
                        className="hidden group-hover:col-start-6 group-hover:block">
          <Trash2 />
        </AnimatedButton>
      </div>
    );
  }
  if (fileView === "plate") {
    return (
      <div className="file-plate" onClick={() => openDirHandler(file)}>
        {
          file.type === "Folder"
            ?
            <Folder size={44} />
            :
            <FileIcon size={44} />
        }
        <div className="line-clamp-2 file-plate__name">{file.name}</div>
        <div className="file-plate__btns" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {file.type !== "Folder" &&
            <AnimatedButton text="Decrypt" onClick={decryptClickHandler}>
              <LockKeyholeOpen />
            </AnimatedButton>
          }
          <AnimatedButton text="Delete" onClick={deleteClickHandler}>
            <Trash2 />
          </AnimatedButton>
        </div>
      </div>
    );
  }

};

export default File;
