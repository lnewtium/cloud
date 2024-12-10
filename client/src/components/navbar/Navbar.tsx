import { logout } from "@/reducers/userReducer";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import { CircleUserRound, Cloud, LogOut } from "lucide-react";
import DefaultButton from "@/components/ui/button/DefaultButton";
import AnimatedLogo from "@/components/navbar/logo/AnimatedLogo";
import Search from "@/components/navbar/Search";

const Navbar = () => {
  const isAuth = useAppSelector(state => state.user.isAuth);
  const dispatch = useAppDispatch();

  return (
    <div className="bg-[#2a2a2a] flex items-center w-full h-[50px] sticky top-0 overflow-hidden">
      <div
        className={`min-w-[900px] mx-auto gap-[1.5vw] flex w-[60vw] items-center ${!isAuth && "justify-center" /* Center logo */}`}>
        <AnimatedLogo text={"SECURE CLOUD"} to={"/"}>
          <Cloud color="#c65139" size={32} />
        </AnimatedLogo>
        {isAuth && ( // If user authorized
          <>
            <Search />
            <DefaultButton text="Logout" onClick={() => dispatch(logout())}>
              <LogOut color="#de6e57" />
            </DefaultButton>
            <CircleUserRound size={40} color="#c65139" />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
