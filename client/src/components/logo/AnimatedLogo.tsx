import { ReactElement } from "react";
import { Link } from "react-router-dom";
import styles from "./AnimatedLogo.module.less";

const AnimatedLogo = ({ children, text, ...props }:
                      { children: ReactElement, text: string, to: string, [_: string]: any }) => {
  return (
    <Link {...props} className={styles.logo + " group"}>
      <div className={"mr-1 group-hover:-translate-x-1 transition-all duration-75"}>{children}</div>
      {text}
    </Link>
  );
};

export default AnimatedLogo;