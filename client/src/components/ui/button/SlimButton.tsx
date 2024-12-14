import { FC, ReactElement } from "react";
import { classTools } from "@/utils/classTools";
import { StyledButton } from "@/components/ui/button/DefaultButton";

type propsType = {
  children: ReactElement;
  text: string;
  className?: string;
  [_: string]: any;
};

const SlimButton: FC<propsType> = ({ children, text, className, ...props }) => {
  return (
    <StyledButton
      {...props}
      className={classTools("group/btn py-2 px-4", className)}>
      <div className="md:mr-1 group-hover/btn:scale-125 transition-all duration-75">
        {children}
      </div>
      <span className="hidden text-nowrap md:block">{text}</span>
    </StyledButton>
  );
};

export default SlimButton;
