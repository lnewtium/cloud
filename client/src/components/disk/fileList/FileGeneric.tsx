import { FC, MouseEventHandler } from "react";
import { pushToStack, setCurrentDir } from "@/reducers/fileReducer";
import { askForDecryptPass, deleteFile } from "@/actions/file";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import { IFile, IFolder } from "@/types/file";
import FileListStyled from "@/components/disk/fileList/FileListStyled";
import FilePlateStyled from "@/components/disk/fileList/FilePlateStyled";

export type subProps = {
  file: IFile;
  clickHandler: MouseEventHandler;
};

const FileGeneric: FC<{ file: IFile }> = ({ file }) => {
  const dispatch = useAppDispatch();
  const currentDir = useAppSelector(state => state.files.currentDir);
  const fileView = useAppSelector(state => state.files.view);

  const clickHandler: MouseEventHandler = e => {
    if (file.type === "Folder") {
      // Open dir
      if (currentDir) dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file as IFolder));
    } else {
      // Decrypt file
      e.stopPropagation();
      dispatch(askForDecryptPass(file));
    }
  };

  if (fileView === "list") {
    return <FileListStyled file={file} clickHandler={clickHandler} />;
  }
  return <FilePlateStyled file={file} clickHandler={clickHandler} />;
};

export default FileGeneric;
