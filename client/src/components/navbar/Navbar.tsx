import React, { ChangeEventHandler, useState } from "react";
import { logout } from "@/reducers/userReducer";
import { getFiles, searchFiles } from "@/actions/file";
import { showLoader } from "@/reducers/appReducer";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import { CircleUserRound, Cloud, LogOut } from "lucide-react";
import DefaultButton from "@/components/ui/button/DefaultButton";
import AnimatedLogo from "@/components/navbar/logo/AnimatedLogo";
import Input from "@/components/ui/input/Input";

const Navbar = () => {
  const isAuth = useAppSelector(state => state.user.isAuth);
  const currentDir = useAppSelector(state => state.files.currentDir);
  const dispatch = useAppDispatch();
  const [searchName, setSearchName] = useState("");
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);

  const searchChangeHandler: ChangeEventHandler<HTMLInputElement> = e => {
    setSearchName(e.target.value);
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }
    dispatch(showLoader());
    if (e.target.value != "") {
      setSearchTimeout(
        setTimeout(
          (value: string) => {
            dispatch(searchFiles(value));
          },
          500,
          e.target.value,
        ),
      );
    } else {
      dispatch(getFiles(currentDir));
    }
  };

  return (
    <div className="bg-[#2a2a2a] flex items-center w-full h-[50px] sticky top-0 overflow-hidden">
      <div
        className={`min-w-[900px] mx-auto flex w-[60vw] items-center ${!isAuth && "justify-center" /*Center logo*/}`}>
        <AnimatedLogo text={"SECURE CLOUD"} to={"/"}>
          <Cloud color="#c65139" size={32} />
        </AnimatedLogo>
        {isAuth && ( // If user authorized
          <>
            <form autoComplete="off" className="grow mx-5">
              {/* Use form to break autofill*/}
              <Input
                value={searchName}
                onChange={searchChangeHandler}
                type="text"
                id="search"
                autoComplete="off"
                placeholder="Search..."
              />
            </form>
            <DefaultButton
              text="Logout"
              className="ml-10 mr-4"
              onClick={() => dispatch(logout())}>
              <LogOut color="#de6e57" />
            </DefaultButton>
            <CircleUserRound
              className="min-w-10 max-w-10"
              size={40}
              color="#c65139"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
