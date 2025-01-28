import { logout } from "@/reducers/userReducer";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import { CircleUserRound, LogOut } from "lucide-react";
import AnimatedLogo from "@/components/navbar/AnimatedLogo";
import Search from "@/components/navbar/Search";
import SlimButton from "@/components/ui/button/SlimButton";
import { uiStrings } from "@/utils/translate";

const Navbar = () => {
  const isAuth = useAppSelector(state => state.user.isAuth);
  const dispatch = useAppDispatch();

  return (
    <div className="bg-[#2a2a2a] flex justify-center lg:justify-normal items-center w-full h-[50px] sticky top-0 overflow-hidden">
      <div
        className={`mx-0 lg:mx-auto gap-[1.5vw] flex lg:w-[60vw] items-center justify-center lg:justify-normal ${!isAuth && "justify-center" /* Center logo */}`}>
        <AnimatedLogo />

        {isAuth && ( // If user authorized
          <>
            <Search />
            <SlimButton
              text={uiStrings.logout}
              onClick={() => dispatch(logout())}>
              <LogOut color="#de6e57" />
            </SlimButton>
            <CircleUserRound
              size={40}
              color="#c65139"
              className="hidden sm:block"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
