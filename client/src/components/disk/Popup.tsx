import React, { useState } from "react";
import Input from "@/utils/input/Input";
import { setPopupDisplay } from "@/reducers/fileReducer";
import { createDir } from "@/actions/file";
import { StyledButton } from "../Button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import { X } from "lucide-react";

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
        <div className="popup__header"
             style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div className="popup__title">Create new folder</div>
          <StyledButton onClick={() => dispatch(setPopupDisplay("none"))}><X /></StyledButton>
        </div>
        <Input type="text" placeholder="Enter folder name..." value={dirName} setValue={setDirName} />
        <StyledButton className="popup__create" onClick={() => createHandler()}>Create</StyledButton>
      </div>
    </div>
  );
};

export default Popup;
