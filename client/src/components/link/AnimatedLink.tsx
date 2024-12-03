import { ReactElement } from "react";
import { Link } from "react-router-dom";
import styles from "./AnimatedLink.module.less";

const AnimatedLink = ({ children, text, className, ...props }:
                      { children: ReactElement, className?: string, text: string, to: string, [_: string]: any }) => {
  return (
    <Link {...props} className={styles.link + " flex items-center group rounded-md my-1 " + className}>
      <div className={"mr-1 group-hover:-translate-x-1 transition-all duration-75"}>{children}</div>
      {text}
    </Link>
  );
};

export default AnimatedLink;