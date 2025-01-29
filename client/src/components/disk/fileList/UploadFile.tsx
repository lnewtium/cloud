import { Card, CardContent } from "@/components/ui/card";
import { FileUp } from "lucide-react";
import { uiStrings } from "@/utils/translate";
import { ChangeEventHandler, MouseEventHandler } from "react";
import { uploadFile } from "@/actions/file";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";

const UploadFile = () => {
  const dispatch = useAppDispatch();
  const currentDir = useAppSelector(state => state.files.currentDir);
  const fileView = useAppSelector(state => state.files.view);

  const clearFileInput: MouseEventHandler<HTMLInputElement> = e => {
    // Hacky way to make a file input send onChange on identical files
    (e.target as HTMLInputElement).value = "";
  };

  const fileUploadHandler: ChangeEventHandler<HTMLInputElement> = e => {
    if (!e.target.files) return;
    const files = [...e.target.files];
    files.forEach(file => dispatch(uploadFile(file, currentDir)));
  };

  return fileView === "plate" ? (
    <Card
      className="outline-0 group rounded-[10px] border-0 m-1.5 bg-[]
                  bg-gradient-to-b
                  from-[#26262694] 0%
                  via-[#61616160] 53%
                  to-[#262626a1] 100%
                  hover:bg-[#57575799] transition-all duration-300">
      <CardContent className="group flex items-center justify-center w-[180px] h-[220px]">
        <label
          htmlFor="upload-input"
          className="flex flex-col items-center text-center
                        py-[5px] px-1 md:px-2.5 cursor-pointer ml-2.5 select-none gap-2">
          <FileUp
            className="md:mr-1 group-hover:scale-125 transition-all duration-75"
            color="#de6e57"
            size={80}
          />
          <span>{uiStrings.uploadFile}</span>
        </label>
        <input
          multiple={true}
          onClick={clearFileInput}
          onChange={fileUploadHandler}
          type="file"
          id="upload-input"
          className="hidden"
        />
      </CardContent>
    </Card>
  ) : (
    <div className="flex items-center justify-center">
      <div
        className="group rounded-[10px]
                  my-2.5 p-1 cursor-pointer
                  bg-gradient-to-r
                  from-[#26262694] 0%
                  via-[#61616160] 53%
                  to-[#262626a1] 100%
                  hover:bg-[#57575799] transition-all duration-300">
        <label
          htmlFor="upload-input"
          className="flex flex-col items-center text-center
                        py-[5px] px-1 md:px-2.5 cursor-pointer ml-2.5 select-none gap-2">
          <FileUp
            className="md:mr-1 group-hover:scale-125 transition-all duration-75"
            color="#de6e57"
            size={40}
          />
          <span>{uiStrings.uploadFile}</span>
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
    </div>
  );
};

export default UploadFile;
