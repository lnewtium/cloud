import React from "react";
import Modal from "react-modal";
import { hideAskPass, setCryptPass } from "@/reducers/uploadReducer";
import { decryptFile, uploadFileEncrypted } from "@/actions/file";
import { X, LockKeyhole, LockKeyholeOpen } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import DefaultButton from "@/components/ui/button/DefaultButton";
import Input from "@/components/ui/input/Input";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "2rem 1.5rem",
    minWidth: "300px",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "10px",
    gap: "16px",
    width: "40%",
    background:
      "linear-gradient(0deg, #262626d4 0%, #51515190 53%, #262626a1 100%)",
  },
  overlay: {
    background: "#0000007f", // Semi-transparent black background
  },
};

export const AskPass = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(state => state.upload.askPass);
  const uploadFile = useAppSelector(state => state.upload.uploadFile);
  const downloadFile = useAppSelector(state => state.upload.downloadFile);
  const pass = useAppSelector(state => state.upload.cryptPass);
  const currentAction = useAppSelector(state => state.upload.currentAction);

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => dispatch(hideAskPass())}
        style={customStyles}
        contentLabel="Enter encryption key">
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
                dispatch(uploadFileEncrypted(uploadFile!, pass));
              else if (currentAction === "download")
                decryptFile(downloadFile!, pass);
              dispatch(hideAskPass());
            }}>
            {currentAction === "upload" ? (
              <LockKeyhole color="#de6e57" />
            ) : (
              <LockKeyholeOpen color="#de6e57" />
            )}
          </DefaultButton>
        </div>
      </Modal>
    </div>
  );
};
