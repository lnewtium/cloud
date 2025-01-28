import React, { MouseEventHandler } from "react";
import { classTools } from "@/utils/classTools";

export const StyledButton = ({
  children,
  className,
  onClick,
}: React.PropsWithChildren<{
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}>) => {
  return (
    <button
      className={classTools(
        "m-1 text-[16px] rounded-[6px] border-none cursor-pointer \
                  uppercase transition-colors duration-300 ease-in-out \
                  select-none flex justify-center items-center outline-0 bg-gradient-to-r \
                  from-[#414141d1] 0% via-[#61616150] 53% to-[#4f4f4f99] 100%\
                  hover:shadow-[0_4px_6px_rgba(0,0,0,0.2)] hover:bg-[#575757] \
                  disabled:bg-[#444444] disabled:text-[#888888] disabled:cursor-not-allowed",
        className,
      )}
      onClick={onClick}>
      {children}
    </button>
  );
};

const DefaultButton = ({
  children,
  text,
  className,
  ...props
}: React.PropsWithChildren<{
  text: string;
  className?: string;
  [_: string]: any;
}>) => {
  return (
    <StyledButton
      {...props}
      className={classTools("group/btn py-2 px-4", className)}>
      <div className="mr-1 group-hover/btn:scale-125 transition-all duration-75">
        {children}
      </div>
      <span className="text-nowrap">{text}</span>
    </StyledButton>
  );
};

export default DefaultButton;
