import React from "react";
import Modal from "react-modal";
import { hideAskPass, setCryptPass } from "@/reducers/uploadReducer";
import { decryptFile, uploadFileEncrypted } from "@/actions/file";
import { X, LockKeyhole, LockKeyholeOpen } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import { StyledButton } from "@/components/Button";

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
    backgroundColor: "#3a3a3a"
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
        <input type={"password"} placeholder={"Enter encryption key"}
               onChange={e => dispatch(setCryptPass(e.target.value))} />
        <div style={{ display: "flex", margin: "8px", justifyContent: "space-between", alignItems: "center" }}>
          <StyledButton onClick={() => dispatch(hideAskPass())}><X /></StyledButton>
          <StyledButton onClick={() => {
            if (currentAction === "upload")
              dispatch(uploadFileEncrypted(uploadFile!, pass));
            else if (currentAction === "download")
              decryptFile(downloadFile!, pass);
            dispatch(hideAskPass());
          }}>
            {
              currentAction === "upload" ? <LockKeyhole /> : <LockKeyholeOpen />
            }
          </StyledButton>
        </div>
      </Modal>
    </div>
  );
};