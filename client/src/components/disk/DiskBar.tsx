import {
  ChangeEventHandler,
  MouseEventHandler
} from "react";
import { StyledSelect } from "@/components/Select";
import { setCurrentDir, setFileView, setPopupDisplay } from "@/reducers/fileReducer";
import { AlignJustify, CircleChevronLeft, FileUp, FolderPlus, Grip } from "lucide-react";
import "./disk.less";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import { uploadFile } from "@/actions/file";
import AnimatedButton from "@/components/button/AnimatedButton";

const DiskBar = ({ sort, setSort }: { sort: string, setSort: (value: string) => void }) => {
  const dispatch = useAppDispatch();
  const currentDir = useAppSelector(state => state.files.currentDir);
  const dirStack = useAppSelector(state => state.files.dirStack);

  const clearFileInput: MouseEventHandler<HTMLInputElement> = (e) => {
    // Hacky way to make a file input send onChange on identical files
    (e.target as HTMLInputElement).value = "";
  };

  const backClickHandler = () => {
    if (dirStack.length > 0) {
      const backDirId = dirStack.pop();
      dispatch(setCurrentDir(backDirId!));
    } else {
      dispatch(setCurrentDir(null));
    }
  };

  const fileUploadHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (!event.target.files) return;
    const files = [...event.target.files];
    files.forEach(file => dispatch(uploadFile(file, currentDir)));
  };

  // @ts-ignore
  return (
    <div className="disk__btns">
      <AnimatedButton text="" onClick={backClickHandler}><CircleChevronLeft /></AnimatedButton>
      <AnimatedButton text="Create folder"
                      onClick={() => dispatch(setPopupDisplay("flex"))}><FolderPlus /></AnimatedButton>
      <div className="group">
        <label htmlFor="disk__upload-input" className="disk__upload-label">
          <FileUp className={"mr-1 group-hover:-translate-x-1 transition-all duration-75"} />
          Upload file
        </label>
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
      <button className="disk__plate" onClick={() => dispatch(setFileView("plate"))}>
        <Grip color="#de6e57" size={32} />
      </button>
      <button className="disk__list" onClick={() => dispatch(setFileView("list"))}>
        <AlignJustify color="#de6e57" size={32} />
      </button>
    </div>
  );
};

export default DiskBar;