import { FC } from "react";
import {
  File as FileIcon,
  Folder,
  LockKeyholeOpen,
  Trash2,
} from "lucide-react";
import sizeFormat from "@/utils/sizeFormat";
import DefaultButton from "@/components/ui/button/DefaultButton";
import { subProps } from "@/components/disk/fileList/file/FileGeneric";

const FileListStyled: FC<subProps> = ({
  file,
  clickHandler,
  decryptClickHandler,
  deleteClickHandler,
}) => {
  return (
    <div
      className="group grid grid-cols-[1fr_4fr_repeat(4,1fr)] items-center rounded-[10px] transition-all 
                  duration-200 my-2.5 hover:cursor-pointer hover:scale-[1.02]
                  bg-gradient-to-r
                  from-[#26262694] 0%
                  via-[#61616160] 53%
                  to-[#262626a1] 100%"
      onClick={clickHandler}>
      {file.type === "Folder" ? (
        <Folder size={40} color="#de6e57" />
      ) : (
        <FileIcon size={40} color="#de6e57" />
      )}
      <span>{file.name}</span>
      <span className="justify-self-center text-center grid-cols-5 group-hover:grid-cols-3">
        {file.date.slice(0, 10)}
      </span>
      <span className="justify-self-center text-center grid-cols-6 group-hover:grid-cols-4">
        {sizeFormat(file.size)}
      </span>
      {file.type !== "Folder" && (
        <DefaultButton
          text="Decrypt"
          onClick={decryptClickHandler}
          className="hidden group-hover:col-start-5 group-hover:block">
          <LockKeyholeOpen color="#de6e57" />
        </DefaultButton>
      )}
      <DefaultButton
        text="Delete"
        onClick={deleteClickHandler}
        className="hidden group-hover:col-start-6 group-hover:block">
        <Trash2 color="#de6e57" />
      </DefaultButton>
    </div>
  );
};

export default FileListStyled;
