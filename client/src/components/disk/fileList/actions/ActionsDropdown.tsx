import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import DropdownTriggerPseudoButton from "@/components/disk/fileList/actions/DropdownTriggerPseudoButton";
import DefaultButton from "@/components/ui/button/DefaultButton";
import { Trash2 } from "lucide-react";
import { FC, MouseEventHandler, RefObject } from "react";
import { deleteFile } from "@/actions/file";
import { useAppDispatch } from "@/hooks/redux-ts";
import { IFile } from "@/types/file";
import { classTools } from "@/utils/classTools";

type subProps = {
  file: IFile;
  refProp?: RefObject<HTMLDivElement | null>;
  className?: string;
};

const ActionsDropdown: FC<subProps> = ({ refProp, file, className }) => {
  const dispatch = useAppDispatch();
  const deleteClickHandler: MouseEventHandler = e => {
    e.stopPropagation();
    dispatch(deleteFile(file));
  };

  return (
    <DropdownMenu
      onOpenChange={open => {
        if (open) {
          refProp?.current?.classList.remove("hidden");
        } else {
          refProp?.current?.classList.add("hidden");
        }
      }}>
      <DropdownMenuTrigger className={classTools("outline-0", className)}>
        <DropdownTriggerPseudoButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="rounded-[10px] mt-1 p-2 text-center
                      border-[#ef9f8c] border-2
                      shadow-2xl
                      bg-gradient-to-t
                    from-[#212121] 0%
                    via-[#2b2b2b] 53%
                    to-[#292929] 100%">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem className="outline-0">
          <DefaultButton text="Delete" onClick={deleteClickHandler}>
            <Trash2 color="#de6e57" />
          </DefaultButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionsDropdown;
