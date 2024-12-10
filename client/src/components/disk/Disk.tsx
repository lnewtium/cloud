import { DragEventHandler, useEffect, useState } from "react";
import { getFiles, uploadFile } from "@/actions/file";
import FileInList from "./fileList/FileInList";
import styles from "./disk.module.css";
import CreateFolder from "../popup/CreateFolder";
import Uploader from "./uploader/Uploader";
import { AskPass } from "../popup/AskPass";
import Modal from "react-modal";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import DiskBar from "@/components/disk/DiskBar";

const Disk = () => {
  const dispatch = useAppDispatch();
  const currentDir = useAppSelector(state => state.files.currentDir);
  const loader = useAppSelector(state => state.app.loader);
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState("type");

  useEffect(() => {
    // Set the app element for accessibility
    Modal.setAppElement("#root");
  }, []);

  useEffect(() => {
    dispatch(getFiles(currentDir, sort));
  }, [currentDir, sort]);

  const dragEnterHandler: DragEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(true);
  };

  const dragLeaveHandler: DragEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragEnter(false);
  };

  const dropHandler: DragEventHandler<HTMLDivElement> = e => {
    e.preventDefault();
    e.stopPropagation();
    let files = [...e.dataTransfer.files];
    files.forEach(file => dispatch(uploadFile(file, currentDir)));
    setDragEnter(false);
  };

  if (loader) {
    return (
      <div className={styles.loader}>
        <div className={styles.ldsDualRing}></div>
      </div>
    );
  }

  return !dragEnter ? (
    <div
      className="mt-5"
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}>
      <DiskBar sort={sort} setSort={setSort} />
      <FileInList />
      <CreateFolder />
      <Uploader />
      <AskPass />
    </div>
  ) : (
    <div
      className={styles.dropArea}
      onDrop={dropHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}>
      Drop files there
    </div>
  );
};

export default Disk;
