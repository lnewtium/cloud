import { FC, useRef } from "react";
import { subProps } from "@/components/disk/fileList/file/File";
import "./file.css";
import { EllipsisVertical, ExternalLink, File as FileIcon, Folder, LockKeyholeOpen, Trash2 } from "lucide-react";
import DefaultButton from "@/components/ui/button/DefaultButton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@radix-ui/react-dropdown-menu";
import SlimButton from "@/components/ui/button/SlimButton";

const FilePlateStyled: FC<subProps> = ({ file, clickHandler, decryptClickHandler, deleteClickHandler }) => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <Card className="card outline-0 group">
      <CardContent className="file-plate hover:cursor-pointer p-0" onClick={clickHandler}>
        {
          file.type === "Folder"
            ?
            <Folder size={80} color="#de6e57" className="file-plate__icon" />
            :
            <FileIcon size={80} color="#de6e57" className="file-plate__icon" />
        }
        <span className="line-clamp-2 h-[5ex] leading-snug">{file.name}</span>
      </CardContent>

      <CardFooter className="h-10 flex items-center p-0 pb-2">
        <div ref={ref} className="hidden group-hover:block ml-auto">
          {file.type !== "Folder" ?
            <DefaultButton text="decrypt" onClick={decryptClickHandler}>
              <LockKeyholeOpen color="#de6e57" />
            </DefaultButton> :
            <DefaultButton text="open" onClick={clickHandler}>
              <ExternalLink color="#de6e57" />
            </DefaultButton>
          }
        </div>
        <DropdownMenu onOpenChange={(open) => {
          if (open) {
            ref.current?.classList.remove("hidden");
          } else {
            ref.current?.classList.add("hidden");
          }
        }}>
          <DropdownMenuTrigger className="ml-auto outline-0">
            <SlimButton className="ml-auto"><EllipsisVertical color="#de6e57" /></SlimButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="dropdown">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="outline-0">
              <DefaultButton text="Delete" onClick={deleteClickHandler}>
                <Trash2 color="#de6e57" />
              </DefaultButton>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
};

export default FilePlateStyled;