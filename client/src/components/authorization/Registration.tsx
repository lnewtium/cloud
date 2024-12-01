import React, { useState } from "react";
import "./authorization.less";
import Input from "../../utils/input/Input";
import { registration } from "@/actions/user";
import { StyledButton } from "@/components/Button";

const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="authorization">
      <div className="authorization__header tracking-wide">Registration</div>
      <Input value={email} setValue={setEmail} type="text" placeholder="Enter email..." />
      <Input value={password} setValue={setPassword} type="password" placeholder="Enter password..." />
      <div className={"ml-auto"}>
        <StyledButton onClick={() => registration(email, password)}>Registration</StyledButton>
      </div>
    </div>
  );
};

export default Registration;
