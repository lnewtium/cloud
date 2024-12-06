import { FC, ReactElement } from "react";
import { Link } from "react-router";
import styles from "./AnimatedLink.module.css";

type propsType = {
  children: ReactElement,
  className?: string,
  text: string,
  to: string,
  [_: string]: any
}

const AnimatedLink: FC<propsType> = ({ children, text, className, ...props }) => {
  return (
    <Link {...props} className={styles.link + " flex items-center group rounded my-1 " + className}>
      <div className={"mr-1 group-hover:scale-125 transition-all duration-75"}>{children}</div>
      {text}
    </Link>
  );
};

export default AnimatedLink;