import React, { ChangeEventHandler, useState } from "react";
import styles from "./navbar.module.less";
import { logout } from "@/reducers/userReducer";
import { getFiles, searchFiles } from "@/actions/file";
import { showLoader } from "@/reducers/appReducer";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import { CircleUserRound, Cloud, KeySquare, LogOut, UserRoundPlus } from "lucide-react";
import DefaultButton from "@/components/ui/button/DefaultButton";
import AnimatedLink from "@/components/navbar/link/AnimatedLink";
import AnimatedLogo from "@/components/navbar/logo/AnimatedLogo";
import Input from "@/utils/input/Input";


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
          <Cloud color="#c65139" size={32} />
        </AnimatedLogo>
        {
          isAuth ? // If user authorized
            <>
              <form autoComplete="off"> {/* Use form to break autofill*/}
                <Input
                  value={searchName}
                  onChange={searchChangeHandler}
                  classnameBox={styles.search}
                  type="text"
                  id="search"
                  autoComplete="off"
                  placeholder="Search..." />
              </form>
              <DefaultButton text="Logout" className={styles.offset_btn}
                              onClick={() => dispatch(logout())}>
                <LogOut color="#de6e57" />
              </DefaultButton>
              <CircleUserRound className="min-w-10 max-w-10" size={40} color="#c65139" />
            </>
            : // If user not authorized
            <>
              <AnimatedLink text={"Login"} className={styles.offset_btn} to="/login">
                <KeySquare color="#de6e57" />
              </AnimatedLink>
              <AnimatedLink text={"Registration"} to="/registration">
                <UserRoundPlus color="#de6e57" />
              </AnimatedLink>
            </>
        }
      </div>
    </div>
  );
};

export default Navbar;
