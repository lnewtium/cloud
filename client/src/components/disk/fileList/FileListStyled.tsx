import { FC } from "react";
import {
  ExternalLink,
  File as FileIcon,
  Folder,
  LockKeyholeOpen,
} from "lucide-react";
import sizeFormat from "@/utils/sizeFormat";
import { subProps } from "@/components/disk/fileList/FileGeneric";
import ActionsDropdown from "@/components/disk/fileList/actions/ActionsDropdown";
import SlimButton from "@/components/ui/button/SlimButton";
import { uiStrings } from "@/utils/translate";

const FileListStyled: FC<subProps> = ({ file, clickHandler }) => {
  return (
    <div
      className="flex sm:grid sm:grid-cols-[1fr_4fr_repeat(2,1fr)_2fr_1fr] items-center rounded-[10px] transition-all
                  duration-200 my-2.5 cursor-pointer
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
      <span className="select-none col-start-2">{file.name}</span>
      <span className="select-none justify-self-center text-center col-start-3 hidden sm:block">
        {file.date.slice(0, 10)}
      </span>
      <span className="select-none justify-self-center text-center col-start-4 hidden sm:block">
        {sizeFormat(file.size)}
      </span>
      <SlimButton
        text={`${file.type === "Folder" ? uiStrings.open : uiStrings.decrypt}`}
        onClick={clickHandler}
        className="col-start-5 ml-4 sm:ml-0">
        {file.type === "Folder" ? (
          <ExternalLink color="#de6e57" />
        ) : (
          <LockKeyholeOpen color="#de6e57" />
        )}
      </SlimButton>
      <ActionsDropdown
        file={file}
        className="col-start-6 justify-self-center"
      />
    </div>
  );
};

export default FileListStyled;
