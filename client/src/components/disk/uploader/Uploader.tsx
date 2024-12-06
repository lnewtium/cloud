import React from "react";
import UploadFile from "./UploadFile";
import "./uploader.css";
import { hideUploader } from "@/reducers/uploadReducer";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";

const Uploader = () => {
  const files = useAppSelector(state => state.upload.files);
  const isVisible = useAppSelector(state => state.upload.isVisible);
  const dispatch = useAppDispatch();

  return (isVisible &&
    <div className="uploader">
      <div className="uploader__header">
        <div className="uploader__title">Downloads</div>
        <button className="uploader__close" onClick={() => dispatch(hideUploader())}>X</button>
      </div>
      {files.map(file =>
        <UploadFile key={file.id} file={file} />
      )}
    </div>
  );
};

export default Uploader;
