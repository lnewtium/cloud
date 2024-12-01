import React, { useState } from "react";
import "./authorization.less";
import Input from "../../utils/input/Input";
import { login } from "@/actions/user";
import { useAppDispatch } from "@/hooks/redux-ts";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  return (
    <div className="authorization">
      <div className="authorization__header">Authorization</div>
      <Input value={email} setValue={setEmail} type="text" placeholder="Enter email..." />
      <Input value={password} setValue={setPassword} type="password" placeholder="Enter password..." />
      <button className="authorization__btn" onClick={() => dispatch(login(email, password))}>Login</button>
    </div>
  );
};

export default Login;
