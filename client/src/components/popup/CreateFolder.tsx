import { useState } from "react";
import Input from "@/components/ui/input/Input";
import { setPopupDisplay } from "@/reducers/fileReducer";
import { createDir } from "@/actions/file";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import { FolderPlus, X } from "lucide-react";
import DefaultButton from "@/components/ui/button/DefaultButton";
import { uiStrings } from "@/utils/translate";

const CreateFolder = () => {
  const [dirName, setDirName] = useState("");
  const popupDisplay = useAppSelector(state => state.files.popupDisplay);
  const currentDir = useAppSelector(state => state.files.currentDir);
  const dispatch = useAppDispatch();

  return (
    <div
      className="bg-[#0000007F] w-full h-screen right-0 left-0 top-0 bottom-0 absolute flex justify-center items-center"
      onClick={() => dispatch(setPopupDisplay("none"))}
      style={{ display: popupDisplay }}>
      <div
        className="min-w-[400px] w-[45vmin] gap-4 py-8 px-6 rounded-[12px] flex flex-col
                  bg-gradient-to-b
                  from-[#212121d4] 0%
                  via-[#3a3a3aa9] 53%
                  to-[#262626a1] 100%
                  backdrop-blur-sm"
        onClick={event => event.stopPropagation()}>
        <span className="text-xl">{uiStrings.createNewFolder}</span>
        <form autoComplete="off" className="mb-2">
          <Input
            type="text"
            placeholder={uiStrings.enterFolderName}
            classnameBox="h-16"
            value={dirName}
            setValue={setDirName}
          />
        </form>
        <div className="flex justify-between">
          <DefaultButton
            text={uiStrings.close}
            className="p-4"
            onClick={() => dispatch(setPopupDisplay("none"))}>
            <X color="#de6e57" />
          </DefaultButton>
          <DefaultButton
            text={uiStrings.create}
            className="p-4"
            onClick={() => dispatch(createDir(dirName, currentDir))}>
            <FolderPlus color="#de6e57" />
          </DefaultButton>
        </div>
      </div>
    </div>
  );
};

export default CreateFolder;
