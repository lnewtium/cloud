import React, { ChangeEventHandler, useState } from "react";
import "./navbar.less";
import { Link, NavLink } from "react-router-dom";
import { logout } from "@/reducers/userReducer";
import { getFiles, searchFiles } from "@/actions/file";
import { showLoader } from "@/reducers/appReducer";
import avatarLogo from "../../assets/img/avatar.svg";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import { CircleUserRound, Cloud } from "lucide-react";

const Navbar = () => {
  const isAuth = useAppSelector(state => state.user.isAuth);
  const currentDir = useAppSelector(state => state.files.currentDir);
  const dispatch = useAppDispatch();
  const [searchName, setSearchName] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);

  const searchChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setSearchName(e.target.value);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    dispatch(showLoader());
    if (e.target.value != "") {
      setSearchTimeout(setTimeout((value: string) => {
        dispatch(searchFiles(value));
      }, 500, e.target.value));
    } else {
      dispatch(getFiles(currentDir));
    }
  };

  return (
    <div className="navbar">
      <div className="container">
        <Cloud className="navbar__logo" color = "#B0B0B0"/>
        <Link className="navbar__header" style={{ textDecorationLine: "none" }} to={"/"}>SECURE CLOUD</Link>
        {isAuth && <input
          value={searchName}
          onChange={searchChangeHandler}
          className="navbar__search"
          type="text"
          placeholder="File name..." />}
        {!isAuth && <div className="navbar__login navbar__btns"><NavLink to="/login">Login</NavLink></div>}
        {!isAuth && <div className="navbar__registration navbar__btns"><NavLink to="/registration">Registration</NavLink></div>}
        {isAuth && <div className="navbar__login navbar__btns" onClick={() => dispatch(logout())}>Logout</div>}
        {isAuth && <CircleUserRound className="navbar__avatar"/>}
      </div>
    </div>
  );
};

export default Navbar;
