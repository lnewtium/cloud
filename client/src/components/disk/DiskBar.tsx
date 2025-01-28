import { ChangeEventHandler, MouseEventHandler } from "react";
import { StyledSelect } from "@/components/ui/DefaultSelect";
import {
  setCurrentDir,
  setFileView,
  setPopupDisplay,
} from "@/reducers/fileReducer";
import {
  AlignJustify,
  CircleChevronLeft,
  FileUp,
  FolderPlus,
  Grip,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import { uploadFile } from "@/actions/file";
import DefaultButton from "@/components/ui/button/DefaultButton";
import SlimButton from "@/components/ui/button/SlimButton";
import { uiStrings } from "@/utils/translate";

const DiskBar = ({
  sort,
  setSort,
}: {
  sort: string;
  setSort: (value: string) => void;
}) => {
  const dispatch = useAppDispatch();
  const currentDir = useAppSelector(state => state.files.currentDir);
  const dirStack = useAppSelector(state => state.files.dirStack);

  const clearFileInput: MouseEventHandler<HTMLInputElement> = e => {
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

  const fileUploadHandler: ChangeEventHandler<HTMLInputElement> = event => {
    if (!event.target.files) return;
    const files = [...event.target.files];
    files.forEach(file => dispatch(uploadFile(file, currentDir)));
  };

  return (
    <div className="flex items-center gap-1">
      <DefaultButton text="" onClick={backClickHandler}>
        <CircleChevronLeft color="#de6e57" />
      </DefaultButton>
      <SlimButton
        text={uiStrings.createFolder}
        onClick={() => dispatch(setPopupDisplay("flex"))}>
        <FolderPlus color="#de6e57" />
      </SlimButton>
      <div className="group">
        <label
          htmlFor="upload-input"
          className="flex items-center text-center border-2 border-dashed transition-all duration-300
                        border-[#de6e57] py-[5px] px-1 md:px-2.5 cursor-pointer ml-2.5 select-none
                        hover:bg-[#57575799] text-nowrap">
          <FileUp
            className="md:mr-1 group-hover:scale-125 transition-all duration-75"
            color="#de6e57"
          />
          <span className="hidden text-nowrap md:block">
            {uiStrings.uploadFile}
          </span>
        </label>
        <input
          multiple={true}
          onClick={clearFileInput}
          onChange={fileUploadHandler}
          type="file"
          id="upload-input"
          className="hidden"
        />
      </div>
      <StyledSelect
        value={sort}
        onChange={e => setSort(e.target.value)}
        className="ml-4 sm:ml-auto">
        <option value="name">{uiStrings.sortByName}</option>
        <option value="type">{uiStrings.sortByType}</option>
        <option value="date">{uiStrings.sortByDate}</option>
      </StyledSelect>
      <button
        className="border-0 outline-0 cursor-pointer my-0 hidden sm:block
                        mx-2.5 transition-transform duration-100 hover:scale-125"
        onClick={() => dispatch(setFileView("plate"))}>
        <Grip color="#de6e57" size={32} />
      </button>
      <button
        className="border-0 outline-0 cursor-pointer my-0 hidden sm:block
                        mx-2.5 transition-transform duration-100 hover:scale-125"
        onClick={() => dispatch(setFileView("list"))}>
        <AlignJustify color="#de6e57" size={32} />
      </button>
    </div>
  );
};

export default DiskBar;
