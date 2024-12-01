import React from "react";
import Modal from "react-modal";
import { hideAskPass, setCryptPass } from "@/reducers/uploadReducer";
import { decryptFile, uploadFileEncrypted } from "@/actions/file";
import { X, LockKeyhole, LockKeyholeOpen } from "lucide-react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";

const StyledButton = styled.button`
    background-color: #c3c3c3; /* Primary color */
    color: white;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    text-transform: uppercase; /* Material UI buttons are typically uppercase */
    transition: background-color 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        background-color: #adadad; /* Darker shade on hover */
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Adding subtle shadow on hover */
    }

    &:disabled {
        background-color: #e0e0e0; /* Light gray when disabled */
        color: #9e9e9e;
        cursor: not-allowed;
    }
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: "16px",
    minWidth: "300px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
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