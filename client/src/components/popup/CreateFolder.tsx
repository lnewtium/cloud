import React, { useState } from "react";
import Input from "@/components/ui/input/Input";
import { setPopupDisplay } from "@/reducers/fileReducer";
import { createDir } from "@/actions/file";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import { FolderPlus, X } from "lucide-react";
import DefaultButton from "@/components/ui/button/DefaultButton";

const CreateFolder = () => {
  const [dirName, setDirName] = useState("");
  const popupDisplay = useAppSelector(state => state.files.popupDisplay);
  const currentDir = useAppSelector(state => state.files.currentDir);
  const dispatch = useAppDispatch();

  return (
    <div
      className="bg-[#0000007F] w-full h-screen right-0 left-0 top-0 bottom-0 absolute flex justify-center items-center"
      onClick={() => dispatch(setPopupDisplay("none"))} style={{ display: popupDisplay }}>
      <div className="w-[400px] bg-[#313131] p-5 rounded-[12px] flex flex-col"
           onClick={event => event.stopPropagation()}>
        <div className="popup__title mb-4">Create new folder</div>
        <form autoComplete="off" className="mb-6">
          <Input type="text" placeholder="Enter folder name..." value={dirName} setValue={setDirName} />
        </form>
        <div className="flex justify-between">
          <DefaultButton text="Close" onClick={() => dispatch(setPopupDisplay("none"))}>
            <X color="#de6e57" />
          </DefaultButton>
          <DefaultButton text="Create" onClick={() => dispatch(createDir(dirName, currentDir))}>
            <FolderPlus color="#de6e57" />
          </DefaultButton>
        </div>
      </div>
    </div>
  );
};

export default CreateFolder;
