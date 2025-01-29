import FileGeneric from "./FileGeneric";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useAppSelector } from "@/hooks/redux-ts";
import { uiStrings } from "@/utils/translate";
import UploadFile from "@/components/disk/fileList/UploadFile";

const FilesContainer = () => {
  const files = useAppSelector(state => state.files.files);
  const fileView = useAppSelector(state => state.files.view);
  const search = useAppSelector(state => state.app.search);

  if (files.length === 0 && search) {
    return (
      <span className="h-[calc(100vh-120px)] flex justify-center items-center">
        {uiStrings.filesNotFound}
      </span>
    );
  }

  switch (fileView) {
    case "plate":
      return (
        <div className="flex my-5 flex-wrap">
          {files.map(file => (
            <FileGeneric key={file.id} file={file} />
          ))}
          <UploadFile />
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
                <FileGeneric file={file} />
              </CSSTransition>
            ))}
          </TransitionGroup>
          <UploadFile />
        </div>
      );
  }
};

export default FilesContainer;
