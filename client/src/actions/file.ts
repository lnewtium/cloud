import axios from 'axios'
// @ts-ignore
import {addFile, setFiles, deleteFile as deleteFileAction} from "@/reducers/fileReducer";
// @ts-ignore
import {
    addUploadFile,
    changeUploadFile,
    showAskPass,
    showUploader,
    setCurrentAction,
    uploadFile as uploadFileAction
} from "@/reducers/uploadReducer";
// @ts-ignore
import {hideLoader, showLoader} from "@/reducers/appReducer";
// @ts-ignore
import {API_URL} from "@/config";
import {decryptData, encryptData} from "@/utils/crypto";

export function getFiles(dirId, sort) {
    return async dispatch => {
        try {
            dispatch(showLoader())
            let url = `${API_URL}api/files`
            if (dirId) {
                url = `${API_URL}api/files?parent=${dirId}`
            }
            if (sort) {
                url = `${API_URL}api/files?sort=${sort}`
            }
            if (dirId && sort) {
                url = `${API_URL}api/files?parent=${dirId}&sort=${sort}`
            }
            const response = await axios.get(url, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            });
            dispatch(setFiles(response.data))
        } catch (e) {
            // @ts-ignore
            alert(e?.response?.data?.message)
        } finally {
            dispatch(hideLoader())
        }
    }
}

export function createDir(dirId, name) {
    return async dispatch => {
        try {
            const response = await axios.post(`${API_URL}api/files`, {
                name,
                parent: dirId,
                type: 'dir'
            }, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
            })
            dispatch(addFile(response.data))
        } catch (e) {
            // @ts-ignore
            alert(e?.response?.data?.message)
        }
    }
}

export function uploadFile(file: File, dirId) {
    return async dispatch => {
        try {
            const formData = new FormData()
            formData.append('file', file)
            if (dirId) {
                formData.append('parent', dirId)
            }
            const reader = new FileReader();
            reader.onload = (evt) => {
                dispatch(setCurrentAction('upload'))
                dispatch(uploadFileAction({name: file.name, content: evt.target?.result, dirId: dirId}))
                dispatch(showAskPass())
            }
            reader.readAsArrayBuffer(file)
        } catch (e) {
            // @ts-ignore
            alert(e?.response?.data?.message)
        }
    }
}

export function uploadFileEncrypted(fileProps: {
    name: string,
    content: string | ArrayBuffer,
    dirId: string | undefined
}, key: string) {
    return async dispatch => {
        try {
            const file = new File([(await encryptData(fileProps.content as ArrayBuffer, key)).ciphertext], fileProps.name)
            const formData = new FormData()
            formData.append('file', file)
            if (fileProps.dirId) {
                formData.append('parent', fileProps.dirId)
            }
            const uploadFile = {name: file.name, progress: 0, id: Date.now()}
            dispatch(showUploader())
            dispatch(addUploadFile(uploadFile))
            const response = await axios.post(`${API_URL}api/files/upload`, formData, {
                headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
                onUploadProgress: progressEvent => {
                    const totalLength = progressEvent.lengthComputable ?
                        progressEvent.total :
                        0;
                    if (totalLength) {
                        uploadFile.progress = Math.round((progressEvent.loaded * 100) / totalLength)
                        dispatch(changeUploadFile(uploadFile))
                    }
                }
            });
            dispatch(addFile(response.data))
        } catch (e) {
            // @ts-ignore
            alert(e?.response?.data?.message)
        }
    }
}


export async function downloadFile(file) {
    const response = await fetch(`${API_URL}api/files/download?id=${file._id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    if (response.status === 200) {
        const blob = await response.blob()
        const downloadUrl = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = file.name
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
}

export function askForDecryptPass(file) {
    return async dispatch => {
        dispatch(setCurrentAction('download'))
        dispatch(uploadFileAction(file))
        dispatch(showAskPass())
    }
}

export function decryptFile(file, key) {
    return async dispatch => {
        const response = await fetch(`${API_URL}api/files/download?id=${file._id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        if (response.status === 200) {
            const blob = await response.blob()
            const decrypted = await decryptData(await blob.arrayBuffer(), key)
            const downloadUrl = window.URL.createObjectURL(new Blob([decrypted.data], { type: 'application/octet-stream' }))
            const link = document.createElement('a')
            link.href = downloadUrl
            link.download = file.name
            document.body.appendChild(link)
            link.click()
            link.remove()
        }
    }
}

export function deleteFile(file) {
    return async dispatch => {
        try {
            const response = await axios.delete(`${API_URL}api/files?id=${file._id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(deleteFileAction(file._id))
            alert(response.data.message)
        } catch (e) {
            // @ts-ignore
            alert(e?.response?.data?.message)
        }
    }
}

export function searchFiles(search) {
    return async dispatch => {
        try {
            const response = await axios.get(`${API_URL}api/files/search?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(setFiles(response.data))
        } catch (e) {
            // @ts-ignore
            alert(e?.response?.data?.message)
        } finally {
            dispatch(hideLoader())
        }
    }
}
