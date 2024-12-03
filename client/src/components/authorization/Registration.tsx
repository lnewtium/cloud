import { useState } from "react";
import "./authorization.less";
import Input from "../../utils/input/Input";
import { registration } from "@/actions/user";
import { UserRoundPlus } from "lucide-react";
import AnimatedButton from "@/components/button/AnimatedButton";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="authorization">
      <div className="authorization__header tracking-wide">Registration</div>
      <Input value={email} setValue={setEmail} type="text" placeholder="Enter email..." />
      <Input value={password} setValue={setPassword} type="password" placeholder="Enter password..." />
      <AnimatedButton className="ml-auto" text="Registration"
                      onClick={() => registration(email, password)}>
        <UserRoundPlus />
      </AnimatedButton>
    </div>
  );
};

export default Registration;
