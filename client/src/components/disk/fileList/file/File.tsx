import { FC, MouseEventHandler } from "react";
import { pushToStack, setCurrentDir } from "@/reducers/fileReducer";
import { askForDecryptPass, deleteFile } from "@/actions/file";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import { IFile, IFolder } from "@/types/file";
import FileListStyled from "@/components/disk/fileList/file/FileListStyled";
import FilePlateStyled from "@/components/disk/fileList/file/FilePlateStyled";

export type subProps = {
  file: IFile;
  clickHandler: MouseEventHandler<HTMLDivElement>;
  decryptClickHandler: MouseEventHandler;
  deleteClickHandler: MouseEventHandler;
};

const File: FC<{ file: IFile }> = ({ file }) => {
  const dispatch = useAppDispatch();
  const currentDir = useAppSelector(state => state.files.currentDir);
  const fileView = useAppSelector(state => state.files.view);

  const clickHandler: MouseEventHandler<HTMLDivElement> = e => {
    if (file.type === "Folder") {
      if (currentDir) dispatch(pushToStack(currentDir));
      dispatch(setCurrentDir(file as IFolder));
    } else {
      decryptClickHandler(e);
    }
  };

  const decryptClickHandler: MouseEventHandler = e => {
    e.stopPropagation();
    dispatch(askForDecryptPass(file));
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
        decryptClickHandler={decryptClickHandler}
        deleteClickHandler={deleteClickHandler}
      />
    );
  }
  return (
    <FilePlateStyled
      file={file}
      clickHandler={clickHandler}
      decryptClickHandler={decryptClickHandler}
      deleteClickHandler={deleteClickHandler}
    />
  );
};

export default File;
