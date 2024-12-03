import React, { useState } from "react";
import Input from "@/utils/input/Input";
import { setPopupDisplay } from "@/reducers/fileReducer";
import { createDir } from "@/actions/file";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import { FolderPlus, X } from "lucide-react";
import AnimatedButton from "@/components/button/AnimatedButton";

const Popup = () => {
  const [dirName, setDirName] = useState("");
  const popupDisplay = useAppSelector(state => state.files.popupDisplay);
  const currentDir = useAppSelector(state => state.files.currentDir);
  const dispatch = useAppDispatch();

  function createHandler() {
    dispatch(createDir(dirName, currentDir));
  }

  return (
    <div className="popup" onClick={() => dispatch(setPopupDisplay("none"))} style={{ display: popupDisplay }}>
      <div className="popup__content" onClick={(event => event.stopPropagation())}>
        <div className="popup__title">Create new folder</div>
        <Input type="text" placeholder="Enter folder name..." value={dirName} setValue={setDirName} />
        <div className={"flex justify-between"}>
          <AnimatedButton text="Close" onClick={() => dispatch(setPopupDisplay("none"))}><X /></AnimatedButton>
          <AnimatedButton text="Create" className="popup__create"
                          onClick={createHandler}><FolderPlus /></AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default Popup;
