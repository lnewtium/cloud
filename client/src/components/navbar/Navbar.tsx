import { logout } from "@/reducers/userReducer";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-ts";
import { CircleUserRound, LogOut } from "lucide-react";
import AnimatedLogo from "@/components/navbar/AnimatedLogo";
import Search from "@/components/navbar/Search";
import SlimButton from "@/components/ui/button/SlimButton";
import { uiStrings } from "@/utils/translate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

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
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-0 group">
                <CircleUserRound
                  size={40}
                  color="#c65139"
                  className={
                    "group-data-[state=open]:scale-105 transition-all duration-75"
                  }
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className={"bg-[#2a2a2a] p-1 mt-2 rounded-[10px]"}>
                <SlimButton
                  text={uiStrings.logout}
                  onClick={() => dispatch(logout())}>
                  <LogOut color="#de6e57" />
                </SlimButton>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
