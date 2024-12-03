import { ReactElement } from "react";
import { StyledButton } from "@/components/button/StyledButton";

const AnimatedButton = ({ children, text, className, ...props }:
                        { children: ReactElement, className?: string, text: string, [_: string]: any }) => {
  return (
    <div className={className}>
      <StyledButton {...props} className={"flex items-center group"}>
        <div className={"mr-1 group-hover:-translate-x-1 transition-all duration-75"}>{children}</div>
        {text}
      </StyledButton>
    </div>
  );
};

export default AnimatedButton;