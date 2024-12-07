import File from "./file/File";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useAppSelector } from "@/hooks/redux-ts";

const FileList = () => {
  const files = useAppSelector(state => state.files.files);
  const fileView = useAppSelector(state => state.files.view);

  if (files.length === 0) {
    return <span>Files not found</span>;
  }

  switch (fileView) {
    case "plate":
      return (
        <div className="flex my-5 flex-wrap">
          {files.map(file => (
            <File key={file.id} file={file} />
          ))}
        </div>
      );
    case "list":
      return (
        <div className="my-5 mx-0">
          <TransitionGroup>
            {files.map(file => (
              <CSSTransition
                key={file.id}
                classNames={{
                  enterActive: "animate-appear",
                }}
                timeout={500}
                exit={false}>
                <File file={file} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      );
  }
};

export default FileList;
