import { ChangeEventHandler, MouseEventHandler, useRef } from "react";
import styles from "./input.module.css";
import { classTools } from "@/utils/classTools";

type propsType = {
  value?: string;
  type: string;
  placeholder: string;
  classnameBox?: string;
  classnameInput?: string;
  className?: never;
  onClick?: MouseEventHandler<HTMLInputElement>;
  [_: string]: any;
};

type changeType =
  | {
      onChange: ChangeEventHandler<HTMLInputElement>;
      setValue?: never;
    }
  | {
      setValue: (value: string) => void;
      onChange?: never;
    };

const Input: React.FC<propsType & changeType> = ({
  classnameBox,
  classnameInput,
  setValue,
  value,
  type,
  placeholder,
  onChange,
  onClick,
  ...props
}) => {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div
      className={classTools(styles.box, classnameBox)}
      onClick={() => ref.current?.focus()}>
      <input
        onChange={onChange ? onChange : e => setValue(e.target.value)}
        onClick={onClick ? onClick : e => e.stopPropagation()}
        value={value}
        type={type}
        ref={ref}
        placeholder={placeholder}
        className={classTools(styles.input, classnameInput)}
        {...props}
      />
    </div>
  );
};

export default Input;
