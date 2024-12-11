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
  deleteClickHandler: MouseEventHandler;
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
  const deleteClickHandler: MouseEventHandler = e => {
    e.stopPropagation();
    dispatch(deleteFile(file));
  };

  if (fileView === "list") {
    return (
      <FileListStyled
        file={file}
        clickHandler={clickHandler}
        deleteClickHandler={deleteClickHandler}
      />
    );
  }
  return (
    <FilePlateStyled
      file={file}
      clickHandler={clickHandler}
      deleteClickHandler={deleteClickHandler}
    />
  );
};

export default FileGeneric;
