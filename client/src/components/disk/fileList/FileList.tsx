import React from "react";
import "./fileList.less";
import File from "./file/File.js";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useAppSelector } from "@/hooks/redux-ts";

const FileList = () => {

  const files = useAppSelector(state => state.files.files);
  const fileView = useAppSelector(state => state.files.view);

  if (files.length === 0) {
    return (
      <div className="loader">Files not found</div>
    );
  }

  if (fileView === "plate") {
    return (
      <div className="fileplate">
        {files.map(file =>
          <File key={file.id} file={file} />
        )}
      </div>
    );
  }

  if (fileView === "list") {
    return (
      <div className="filelist">
        <div className="filelist__header">
          <div className="filelist__name">Name</div>
          <div className="filelist__date">Date</div>
          <div className="filelist__size">Size</div>
        </div>
        <TransitionGroup>
          {files.map(file =>
            <CSSTransition
              key={file.id}
              timeout={500}
              classNames={"file"}
              exit={false}
            >
              <File file={file} />
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>
    );
  }

};

export default FileList;
