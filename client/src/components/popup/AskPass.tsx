import { decryptFile, uploadFileEncrypted } from "@/actions/file";
import { X, LockKeyhole, LockKeyholeOpen } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import DefaultButton from "@/components/ui/button/DefaultButton";
import Input from "@/components/ui/input/Input";
import { hideAskPass, setCryptPass } from "@/reducers/cryptReducer";

export const AskPass = () => {
  const dispatch = useAppDispatch();
  const { isModalOpen, uploadFile, downloadFile, cryptPass, currentAction } =
    useAppSelector(state => state.crypt);

  return (
    <div
      className={`bg-[#0000007F] w-screen h-screen right-0 left-0 top-0 bottom-0 absolute justify-center items-center ${isModalOpen ? "flex" : "hidden"}`}
      onClick={() => dispatch(hideAskPass())}>
      <div
        className="min-w-[400px] w-[45vmin] gap-4 py-8 px-6 rounded-[12px] flex flex-col
                  bg-gradient-to-b
                  from-[#212121d4] 0%
                  via-[#3a3a3aa9] 53%
                  to-[#262626a1] 100%
                  backdrop-blur-sm"
        onClick={event => event.stopPropagation()}>
        <span className="text-xl">Provide encryption passphrase</span>
        <form autoComplete="off" className="mt-4">
          <Input
            type="password"
            id="passphrase"
            autoComplete="off"
            classnameBox="h-16"
            placeholder="Enter encryption key"
            onChange={e => dispatch(setCryptPass(e.target.value))}
          />
        </form>
        <div className="flex mt-6 justify-between items-center">
          <DefaultButton
            className="p-4"
            text="Close"
            onClick={() => dispatch(hideAskPass())}>
            <X color="#de6e57" />
          </DefaultButton>
          <DefaultButton
            className="p-4"
            text={currentAction === "upload" ? "Encrypt" : "Decrypt"}
            onClick={() => {
              if (currentAction === "upload")
                dispatch(uploadFileEncrypted(uploadFile!, cryptPass));
              else if (currentAction === "download")
                decryptFile(downloadFile!, cryptPass);
              dispatch(hideAskPass());
            }}>
            {currentAction === "upload" ? (
              <LockKeyhole color="#de6e57" />
            ) : (
              <LockKeyholeOpen color="#de6e57" />
            )}
          </DefaultButton>
        </div>
      </div>
    </div>
  );
};
