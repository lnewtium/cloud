import { FC, ReactElement } from "react";
import { classTools } from "@/utils/classTools";
import styled from "styled-components";

type propsType = {
  children: ReactElement;
  text: string;
  className?: string;
  [_: string]: any;
};

export const StyledButton = styled.button`
  background: linear-gradient(
    90deg,
    #414141d1 0%,
    #61616150 53%,
    #4f4f4f99 100%
  );
  margin: 4px;
  font-size: 16px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;

  &:hover {
    background-color: #575757; /* Lighter dark shade on hover */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Slightly stronger shadow on hover */
  }

  &:disabled {
    background-color: #444444; /* Dark gray when disabled */
    color: #888888; /* Lighter gray text when disabled */
    cursor: not-allowed;
  }
`;

const DefaultButton: FC<propsType> = ({
  children,
  text,
  className,
  ...props
}) => {
  return (
    <StyledButton
      {...props}
      className={classTools("group/btn py-2 px-4", className)}>
      <div className="mr-1 group-hover/btn:scale-125 transition-all duration-75">
        {children}
      </div>
      {text}
    </StyledButton>
  );
};

export default DefaultButton;
