import { FC } from "react";
import { File as FileIcon, Folder, LockKeyholeOpen, Trash2 } from "lucide-react";
import sizeFormat from "@/utils/sizeFormat";
import DefaultButton from "@/components/ui/button/DefaultButton";
import { subProps } from "@/components/disk/fileList/file/File";

const FileListStyled: FC<subProps> = ({ file, clickHandler, decryptClickHandler, deleteClickHandler }) => {
  return (
    <div className="group file hover:cursor-pointer" onClick={clickHandler}>
      {
        file.type === "Folder"
          ?
          <Folder size={40} color="#de6e57" />
          :
          <FileIcon size={40} color="#de6e57" />
      }
      <div className="file__name">{file.name}</div>
      <div className="file__date">{file.date.slice(0, 10)}</div>
      <div className="file__size">{sizeFormat(file.size)}</div>
      {file.type !== "Folder" &&
        <DefaultButton text="Decrypt" onClick={decryptClickHandler}
                        className="hidden group-hover:col-start-5 group-hover:block">
          <LockKeyholeOpen color="#de6e57" />
        </DefaultButton>
      }
      <DefaultButton text="Delete" onClick={deleteClickHandler}
                      className="hidden group-hover:col-start-6 group-hover:block">
        <Trash2 color="#de6e57" />
      </DefaultButton>
    </div>
  );
};

export default FileListStyled;