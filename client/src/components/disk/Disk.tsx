import { DragEventHandler, useEffect, useState } from "react";
import { getFiles, uploadFile } from "@/actions/file";
import FilesContainer from "./fileList/FilesContainer";
import CreateFolder from "../popup/CreateFolder";
import { AskPass } from "../popup/AskPass";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import DiskBar from "@/components/disk/DiskBar";
import { LoaderCircle } from "lucide-react";

const Disk = () => {
  const dispatch = useAppDispatch();
  const currentDir = useAppSelector(state => state.files.currentDir);
  const loader = useAppSelector(state => state.app.loader);
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState("type");

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
      <div className="flex items-center justify-center h-[calc(100vh-50px)]">
        <LoaderCircle size={40} className="animate-spin"></LoaderCircle>
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
      <FilesContainer />
      <CreateFolder />
      <AskPass />
    </div>
  ) : (
    <div
      className="w-full h-[calc(100vh-90px)] flex items-center justify-center
                text-4xl m-5 border-dashed border-2 border-[var(--font-color)]"
      onDrop={dropHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragEnterHandler}>
      Drop files there
    </div>
  );
};

export default Disk;
