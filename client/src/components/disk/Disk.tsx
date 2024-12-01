import React, {
  ChangeEvent,
  DragEventHandler,
  MouseEventHandler,
  useEffect,
  useState
} from "react";
import { getFiles, uploadFile } from "@/actions/file";
import FileList from "./fileList/FileList.js";
import "./disk.less";
import Popup from "./Popup";
import { setCurrentDir, setFileView, setPopupDisplay } from "@/reducers/fileReducer";
import Uploader from "./uploader/Uploader";
import { AskPass } from "../askpass/AskPass";
import Modal from "react-modal";
import { StyledSelect } from "../Select";
import { StyledButton } from "../Button";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";

const Disk = () => {
  const dispatch = useAppDispatch();
  const currentDir = useAppSelector(state => state.files.currentDir);
  const loader = useAppSelector(state => state.app.loader);
  const dirStack = useAppSelector(state => state.files.dirStack);
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState("type");

  useEffect(() => {
    // Set the app element for accessibility
    Modal.setAppElement("#root");
  }, []);

  useEffect(() => {
    dispatch(getFiles(currentDir, sort));
  }, [currentDir, sort]);

  function showPopupHandler() {
    dispatch(setPopupDisplay("flex"));
  }

  function backClickHandler() {
    if (dirStack.length > 0) {
      const backDirId = dirStack.pop();
      dispatch(setCurrentDir(backDirId!));
    } else {
      dispatch(setCurrentDir(null));
    }
  }

  function fileUploadHandler(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    const files = [...event.target.files];
    files.forEach(file => dispatch(uploadFile(file, currentDir)));
  }

  const clearFileInput: MouseEventHandler<HTMLInputElement> = (e) => {
    // Hacky way to make a file input send onChange on identical files
    (e.target as HTMLInputElement).value = "";
  };

  const dragEnterHandler: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(true);
  };

  const dragLeaveHandler: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(false);
  };

  const dropHandler: DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let files = [...e.dataTransfer.files];
    files.forEach(file => dispatch(uploadFile(file, currentDir)));
    setDragEnter(false);
  };

  if (loader) {
    return (
      <div className="loader">
        <div className="lds-dual-ring"></div>
      </div>
    );
  }

  return (!dragEnter ?
      <div className="disk" onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler} onDragOver={dragEnterHandler}>
        <div className="disk__btns">
          <StyledButton className="disk__back" onClick={backClickHandler}>Back</StyledButton>
          <StyledButton className="disk__create" onClick={() => showPopupHandler()}>Create folder</StyledButton>
          <div className="disk__upload">
            <label htmlFor="disk__upload-input" className="disk__upload-label">Upload file</label>
            <input multiple={true} onClick={clearFileInput} onChange={fileUploadHandler} type="file"
                   id="disk__upload-input" className="disk__upload-input" />
          </div>
          <StyledSelect value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="disk__select">
            <option value="name">By Name</option>
            <option value="type">By Type</option>
            <option value="date">By Date</option>
          </StyledSelect>
          <button className="disk__plate" onClick={() => dispatch(setFileView("plate"))} />
          <button className="disk__list" onClick={() => dispatch(setFileView("list"))} />
        </div>
        <FileList />
        <Popup />
        <Uploader />
        <AskPass />
      </div>
      :
      <div className="drop-area" onDrop={dropHandler} onDragEnter={dragEnterHandler} onDragLeave={dragLeaveHandler}
           onDragOver={dragEnterHandler}>
        Drop files there
      </div>
  );
};

export default Disk;
