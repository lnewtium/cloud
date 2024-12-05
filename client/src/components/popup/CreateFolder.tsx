import React, { useState } from "react";
import Input from "@/utils/input/Input";
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

  const createHandler = () => {
    dispatch(createDir(dirName, currentDir));
  }

  return (
    <div className="popup" onClick={() => dispatch(setPopupDisplay("none"))} style={{ display: popupDisplay }}>
      <div className="popup__content" onClick={(event => event.stopPropagation())}>
        <div className="popup__title mb-4">Create new folder</div>
        <form autoComplete="off" className="mb-6">
          <Input type="text" placeholder="Enter folder name..." value={dirName} setValue={setDirName} />
        </form>
        <div className={"flex justify-between"}>
          <DefaultButton text="Close" onClick={() => dispatch(setPopupDisplay("none"))}><X
            color="#de6e57" /></DefaultButton>
          <DefaultButton text="Create" className="popup__create"
                          onClick={createHandler}><FolderPlus color="#de6e57" /></DefaultButton>
        </div>
      </div>
    </div>
  );
};

export default CreateFolder;
