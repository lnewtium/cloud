import { useState } from "react";
import "./authorization.less";
import Input from "../../utils/input/Input";
import { registration } from "@/actions/user";
import { UserRoundPlus } from "lucide-react";
import DefaultButton from "@/components/ui/button/DefaultButton";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="authorization">
      <span className="authorization__header tracking-wider">New account</span>
      <Input id="email" autoComplete="email" classnameBox="my-2.5 pt-2.5" value={email} setValue={setEmail} type="text" placeholder="Enter email..." />
      <Input id="pass" autoComplete="new-password" classnameBox="my-2.5 pt-2.5" value={password} setValue={setPassword} type="password"
             placeholder="Enter password..." />
      <DefaultButton className="ml-auto mt-4" text="SUBMIT"
                      onClick={() => registration(email, password)}>
        <UserRoundPlus color="#de6e57" />
      </DefaultButton>
    </div>
  );
};

export default Registration;
