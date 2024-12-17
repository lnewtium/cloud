import { ReactElement } from "react";
import { useLocation, useNavigate } from "react-router";
import { TabsTrigger } from "@radix-ui/react-tabs";

const TabButton = ({
  path,
  children,
}: {
  path: string;
  children: ReactElement;
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const changeUrl = (url: string) => {
    navigate(
      `${location.pathname.substring(
        0,
        location.pathname.lastIndexOf("/") + 1,
      )}${url}`,
    );
  };

  const capitalize = (s: string) =>
    (s[0].toUpperCase() + s.slice(1).toLowerCase()) as Capitalize<string>;

  return (
    <TabsTrigger
      className={`rounded-[10px] outline-0 items-center z-10
                            justify-center h-full w-full flex group/tab peer/${path}`}
      value={path}
      onClick={() => changeUrl(path)}>
      <div className="group-hover/tab:scale-125 transition-transform duration-300 mr-1">
        {children}
      </div>
      <span className="font-bold tracking-wide select-none text-2xl">
        {capitalize(path)}
      </span>
    </TabsTrigger>
  );
};

export default TabButton;
