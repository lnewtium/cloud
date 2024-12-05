import React from "react";
import Modal from "react-modal";
import { hideAskPass, setCryptPass } from "@/reducers/uploadReducer";
import { decryptFile, uploadFileEncrypted } from "@/actions/file";
import { X, LockKeyhole, LockKeyholeOpen } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import DefaultButton from "@/components/ui/button/DefaultButton";
import Input from "@/utils/input/Input";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "16px",
    minWidth: "300px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
    borderRadius: "10px",
    width: "40%",
    backgroundColor: "#313131"
  },
  overlay: {
    background: "#00000080" // Semi-transparent black background, adjust opacity as needed, e.g., "0.5B"
  }
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
        contentLabel="Enter encryption key"
      >
        <div className={"mb-4"}>
          Provide encryption passphrase
        </div>
        <Input type="password" id="passphrase" autoComplete="off" placeholder="Enter encryption key"
               onChange={e => dispatch(setCryptPass(e.target.value))} />
        <div className={"flex m-2 mt-6 justify-between items-center"}>
          <DefaultButton text="Close" onClick={() => dispatch(hideAskPass())}><X color="#de6e57" /></DefaultButton>
          <DefaultButton text={currentAction === "upload" ? "Encrypt" : "Decrypt"} onClick={() => {
            if (currentAction === "upload")
              dispatch(uploadFileEncrypted(uploadFile!, pass));
            else if (currentAction === "download")
              decryptFile(downloadFile!, pass);
            dispatch(hideAskPass());
          }}>
            {
              currentAction === "upload" ? <LockKeyhole color="#de6e57" /> : <LockKeyholeOpen color="#de6e57" />
            }
          </DefaultButton>
        </div>
      </Modal>
    </div>
  );
};