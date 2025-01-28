import { FC, useRef } from "react";
import { subProps } from "@/components/disk/fileList/FileGeneric";
import {
  ExternalLink,
  File as FileIcon,
  Folder,
  LockKeyholeOpen,
} from "lucide-react";
import DefaultButton from "@/components/ui/button/DefaultButton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ActionsDropdown from "@/components/disk/fileList/actions/ActionsDropdown";

const FilePlateStyled: FC<subProps> = ({ file, clickHandler }) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Card
      className="outline-0 group rounded-[10px] border-0 m-1.5 bg-[]
                  bg-gradient-to-b
                  from-[#26262694] 0%
                  via-[#61616160] 53%
                  to-[#262626a1] 100%">
      <CardContent
        className="w-[180px] h-[180px] flex-col flex items-center text-center justify-center
                  hover:cursor-pointer p-0"
        onClick={clickHandler}>
        {file.type === "Folder" ? (
          <Folder size={80} color="#de6e57" className="file-plate__icon" />
        ) : (
          <FileIcon size={80} color="#de6e57" className="file-plate__icon" />
        )}
        <span className="line-clamp-2 h-[5ex] leading-snug">{file.name}</span>
      </CardContent>

      <CardFooter className="h-10 flex items-center p-0 pb-2">
        <div ref={ref} className="hidden group-hover:block ml-auto">
          {file.type !== "Folder" ? (
            <DefaultButton text="decrypt" onClick={clickHandler}>
              <LockKeyholeOpen color="#de6e57" />
            </DefaultButton>
          ) : (
            <DefaultButton text="open" onClick={clickHandler}>
              <ExternalLink color="#de6e57" />
            </DefaultButton>
          )}
        </div>
        <ActionsDropdown refProp={ref} file={file} className="ml-auto" />
      </CardFooter>
    </Card>
  );
};

export default FilePlateStyled;
