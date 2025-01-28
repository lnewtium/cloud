import { useEffect, useState } from "react";
import { getFiles, uploadFile } from "@/actions/file";
import FilesContainer from "./fileList/FilesContainer";
import CreateFolder from "../popup/CreateFolder";
import { AskPass } from "../popup/AskPass";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import DiskBar from "@/components/disk/DiskBar";
import { LoaderCircle } from "lucide-react";
import { useCallback } from "react";
import { DropEvent, FileRejection, useDropzone } from "react-dropzone";

const Disk = () => {
  const dispatch = useAppDispatch();
  const currentDir = useAppSelector(state => state.files.currentDir);
  const loader = useAppSelector(state => state.app.loader);
  const [sort, setSort] = useState("type");

  useEffect(() => {
    dispatch(getFiles(currentDir, sort));
  }, [currentDir, sort]);

  const onDrop: (
    acceptedFiles: File[],
    fileRejections: FileRejection[],
    event: DropEvent,
  ) => void = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => dispatch(uploadFile(file, currentDir)));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (loader) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-50px)]">
        <LoaderCircle size={40} className="animate-spin"></LoaderCircle>
      </div>
    );
  }

  return !isDragActive ? (
    <div className="mt-5" {...getRootProps()}>
      <DiskBar sort={sort} setSort={setSort} />
      <FilesContainer />
      <CreateFolder />
      <AskPass />
    </div>
  ) : (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <span
        className="w-full h-[calc(100vh-90px)] flex items-center justify-center
                text-4xl m-5 border-dashed border-2 border-[var(--font-color)]">
        Drop files there
      </span>
    </div>
  );
};

export default Disk;
