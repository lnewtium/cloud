import { Link } from "react-router";
import { Cloud } from "lucide-react";

const AnimatedLogo = () => {
  return (
    <Link
      to="/"
      className="group py-2 px-4 rounded-[6px] border-none cursor-pointer text-nowrap
                transition-colors duration-300 ease-in-out select-none flex
                items-center hover:bg-gradient-to-r
                from-[#414141d1] 0%
                via-[#61616150] 53%
                to-[#4f4f4f99] 100%
                hover:shadow-[0_4px_6px_rgba(0,0,0,0.2)]">
      <div className="mr-1 group-hover:-translate-x-1 transition-all duration-75">
        <Cloud color="#c65139" size={32} />
      </div>
      <span className="text-3xl font-bold">SECURE CLOUD</span>
    </Link>
  );
};

export default AnimatedLogo;
