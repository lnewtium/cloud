import { FC } from "react";
import { File as FileIcon, Folder, LockKeyholeOpen, Trash2 } from "lucide-react";
import sizeFormat from "@/utils/sizeFormat";
import DefaultButton from "@/components/ui/button/DefaultButton";
import { subProps } from "@/components/disk/fileList/file/File";

const FileListStyled: FC<subProps> = ({ file, clickHandler, decryptClickHandler, deleteClickHandler }) => {
  return (
    <div className="group file hover:cursor-pointer hover:scale-[1.02]" onClick={clickHandler}>
      {
        file.type === "Folder"
          ?
          <Folder size={40} color="#de6e57" />
          :
          <FileIcon size={40} color="#de6e57" />
      }
      <span className="file__name">{file.name}</span>
      <span className="justify-self-center text-center grid-cols-5 group-hover:grid-cols-3">{file.date.slice(0, 10)}</span>
      <span className="justify-self-center text-center grid-cols-6 group-hover:grid-cols-4">{sizeFormat(file.size)}</span>
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