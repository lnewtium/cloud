import { FC, ReactElement } from "react";
import { Link } from "react-router";
import styles from "./AnimatedLogo.module.css";
import { cn } from "@/lib/utils";

type propsType = {
  children: ReactElement,
  text: string,
  to: string,
  [_: string]: any
}

const AnimatedLogo: FC<propsType> = ({ children, text, ...props }) => {
  return (
    <Link {...props} className={cn(styles.logo, "group")}>
      <div className={"mr-1 group-hover:-translate-x-1 transition-all duration-75"}>{children}</div>
      {text}
    </Link>
  );
};

export default AnimatedLogo;