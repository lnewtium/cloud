import React, {useState} from 'react';
import Input from "../../utils/input/Input";
import {useDispatch, useSelector} from "react-redux";
import {setPopupDisplay} from "../../reducers/fileReducer";
import {createDir} from "../../actions/file";
import {StyledButton} from "../Button.js";

const Popup = () => {
    const [dirName, setDirName] = useState('')
    const popupDisplay = useSelector(state => state.files.popupDisplay)
    const currentDir = useSelector(state => state.files.currentDir)
    const dispatch = useDispatch()

    function createHandler() {
        dispatch(createDir(currentDir, dirName))
    }

    return (
        <div className="popup" onClick={() => dispatch(setPopupDisplay('none'))} style={{display: popupDisplay}}>
            <div className="popup__content" onClick={(event => event.stopPropagation())}>
                <div className="popup__header" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <div className="popup__title">Создать новую папку</div>
                    <StyledButton className="popup__close" onClick={() => dispatch(setPopupDisplay('none'))}>X</StyledButton>
                </div>
                <Input type="text" placeholder="Введите название папки..." value={dirName} setValue={setDirName}/>
                <StyledButton className="popup__create" onClick={() => createHandler()}>Создать</StyledButton>
            </div>
        </div>
    );
};

export default Popup;
