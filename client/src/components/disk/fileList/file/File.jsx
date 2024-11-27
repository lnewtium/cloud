import React from 'react';
import './file.less'
import dirLogo from '../../../../assets/img/dir.svg'
import fileLogo from '../../../../assets/img/file.svg'
import {useDispatch, useSelector} from "react-redux";
import {pushToStack, setCurrentDir} from "../../../../reducers/fileReducer";
import {askForDecryptPass, deleteFile, downloadFile} from "../../../../actions/file";
import sizeFormat from "../../../../utils/sizeFormat";
import {StyledButton} from "../../../Button.js";

const File = ({file}) => {
    const dispatch = useDispatch()
    const currentDir = useSelector(state => state.files.currentDir)
    const fileView = useSelector(state => state.files.view)

    function openDirHandler(file) {
        if(file.type === 'dir') {
            dispatch(pushToStack(currentDir))
            dispatch(setCurrentDir(file._id))
        }
    }

    function downloadClickHandler(e) {
        e.stopPropagation()
        downloadFile(file)
    }

    function decryptClickHandler(e) {
        e.stopPropagation()
        dispatch(askForDecryptPass(file))
    }

    function deleteClickHandler(e) {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }

    if (fileView === 'list') {
        return (
            <div className='group file' onClick={() => openDirHandler(file)}>
                <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img"/>
                <div className="file__name">{file.name}</div>
                <div className="file__date">{file.date.slice(0, 10)}</div>
                <div className="file__size">{sizeFormat(file.size)}</div>
                {file.type !== 'dir' &&
                    <div style={{display:"flex"}}>
                        <StyledButton onClick={e => downloadClickHandler(e)} className="file__btn file__download">Отладка
                        </StyledButton>
                        <StyledButton onClick={e => decryptClickHandler(e)} className="file__btn file__download">Дешифровать
                        </StyledButton>
                    </div>}
                <StyledButton onClick={(e) => deleteClickHandler(e)} className="file__btn file__delete">Удалить</StyledButton>
            </div>
        );
    }
    if (fileView === 'plate') {
        return (
            <div className='file-plate' onClick={() => openDirHandler(file)}>
                <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file-plate__img"/>
                <div className="file-plate__name">{file.name}</div>
                <div className="file-plate__btns" style={{display: "flex", flexDirection: "column"}}>
                    {file.type !== 'dir' &&
                    <StyledButton onClick={e => decryptClickHandler(e)} className="file-plate__btn file-plate__download">Дешифровать</StyledButton>}
                    <StyledButton onClick={e => deleteClickHandler(e)} className="file-plate__btn file-plate__delete">Удалить</StyledButton>
                </div>
            </div>
        );
    }

};

export default File;
