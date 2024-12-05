import React, { useState } from "react";
import "./authorization.less";
import Input from "../../utils/input/Input";
import { login } from "@/actions/user";
import { useAppDispatch } from "@/hooks/redux-ts";
import { KeySquare } from "lucide-react";
import DefaultButton from "@/components/ui/button/DefaultButton";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  return (
    <div className="authorization">
      <span className="authorization__header tracking-wider">Authorization</span>
      <Input id="email" autoComplete="email" classnameBox="my-2.5 pt-2.5" value={email} setValue={setEmail} type="text" placeholder="Enter email..." />
      <Input id="pass" autoComplete="current-password" classnameBox="my-2.5 pt-2.5" value={password} setValue={setPassword} type="password"
             placeholder="Enter password..." />
      <DefaultButton className="ml-auto mt-4" text="SUBMIT" onClick={() => dispatch(login(email, password))}>
        <KeySquare color="#de6e57" />
      </DefaultButton>
    </div>
  );
};

export default Login;
