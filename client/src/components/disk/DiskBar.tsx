import { StyledSelect } from "@/components/ui/DefaultSelect";
import {
  popStack,
  setCurrentDir,
  setFileView,
  setPopupDisplay,
} from "@/reducers/fileReducer";
import {
  AlignJustify,
  CircleChevronLeft,
  FolderPlus,
  Grip,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import DefaultButton from "@/components/ui/button/DefaultButton";
import SlimButton from "@/components/ui/button/SlimButton";
import { uiStrings } from "@/utils/translate";
import { Separator } from "@/components/ui/separator";
import PathBar from "@/components/disk/PathBar";

const DiskBar = ({
  sort,
  setSort,
}: {
  sort: string;
  setSort: (value: string) => void;
}) => {
  const dispatch = useAppDispatch();
  const dirStack = useAppSelector(state => state.files.dirStack);

  const backClickHandler = () => {
    if (dirStack.length > 0) {
      const backDirId = dirStack[dirStack.length - 1]!;
      dispatch(popStack());
      dispatch(setCurrentDir(backDirId));
    } else {
      dispatch(setCurrentDir(null));
    }
  };

  return (
    <div className="flex items-stretch gap-2 outline-0">
      <DefaultButton text="" onClick={backClickHandler} className="m-0">
        <CircleChevronLeft color="#de6e57" />
      </DefaultButton>
      <PathBar />
      <SlimButton
        className="m-0 ml-4 sm:ml-auto"
        text={uiStrings.createFolder}
        onClick={() => dispatch(setPopupDisplay("flex"))}>
        <FolderPlus color="#de6e57" />
      </SlimButton>
      <StyledSelect value={sort} onChange={e => setSort(e.target.value)}>
        <option value="name">{uiStrings.sortByName}</option>
        <option value="type">{uiStrings.sortByType}</option>
        <option value="date">{uiStrings.sortByDate}</option>
      </StyledSelect>
      <div className="bg-[#2a2a2a] flex items-center rounded-[4px] ml-1 py-2">
        <button
          className="border-0 outline-0 cursor-pointer my-0 hidden sm:block
                        mx-2.5 transition-transform duration-100 hover:scale-125"
          onClick={() => dispatch(setFileView("plate"))}>
          <Grip color="#de6e57" size={32} />
        </button>
        <Separator orientation="vertical" className="h-3/5 opacity-40" />
        <button
          className="border-0 outline-0 cursor-pointer my-0 hidden sm:block
                        mx-2.5 transition-transform duration-100 hover:scale-125"
          onClick={() => dispatch(setFileView("list"))}>
          <AlignJustify color="#de6e57" size={32} />
        </button>
      </div>
    </div>
  );
};

export default DiskBar;
