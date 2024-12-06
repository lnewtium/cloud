import React from "react";
import "./fileList.css";
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
      <div className="my-5 mx-0">
        <div className="grid grid-cols-[1fr_4fr_repeat(4,1fr)] ">
          <div className="grid-cols-2">Name</div>
          <div className="grid-cols-5 justify-self-center">Date</div>
          <div className="grid-cols-6 justify-self-center">Size</div>
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
