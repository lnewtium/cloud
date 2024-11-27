import React from 'react';
import {useDispatch} from "react-redux";
import {deleteAvatar, uploadAvatar} from "../../actions/user";
import {StyledButton} from "../Button.js";

const Profile = () => {
    const dispatch = useDispatch()

    function changeHandler(e) {
        const file = e.target.files[0]
        dispatch(uploadAvatar(file))
    }

    return (
        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <StyledButton onClick={() => dispatch(deleteAvatar())}>Удалить аватар</StyledButton>
            <input accept="image/*" onChange={e => changeHandler(e)} type="file" placeholder="Загрузить аватар"/>
        </div>
    );
};

export default Profile;
