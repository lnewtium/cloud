import React, { ChangeEventHandler, useState } from "react";
import styles from "./navbar.module.less";
import { logout } from "@/reducers/userReducer";
import { getFiles, searchFiles } from "@/actions/file";
import { showLoader } from "@/reducers/appReducer";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import { CircleUserRound, Cloud, KeySquare, LogOut, UserRoundPlus } from "lucide-react";
import AnimatedButton from "@/components/button/AnimatedButton";
import AnimatedLink from "../link/AnimatedLink";
import AnimatedLogo from "@/components/logo/AnimatedLogo";


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
    <div className={styles.navbar}>
      <div className={styles.container}>
        <AnimatedLogo text={"SECURE CLOUD"} to={"/"}>
          <Cloud color="#B0B0B0" size={32} />
        </AnimatedLogo>
        {
          isAuth ? // If user authorized
            <>
              <input
                value={searchName}
                onChange={searchChangeHandler}
                className={styles.search}
                type="text"
                placeholder="File name..." />
              <AnimatedButton text="Logout" className={styles.offset_btn}
                              onClick={() => dispatch(logout())}>
                <LogOut />
              </AnimatedButton>
              <CircleUserRound className="size-10" />
            </>
            : // If user not authorized
            <>
              <AnimatedLink text={"Login"} className={styles.offset_btn} to="/login">
                <KeySquare/>
              </AnimatedLink>
              <AnimatedLink text={"Registration"} to="/registration">
                <UserRoundPlus/>
              </AnimatedLink>
            </>
        }
      </div>
    </div>
  );
};

export default Navbar;
