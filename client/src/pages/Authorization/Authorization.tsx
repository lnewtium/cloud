import { FormEventHandler, useState } from "react";
import Input from "@/components/ui/input/Input";
import { login, registration } from "@/actions/user";
import { useAppDispatch } from "@/hooks/redux-ts";
import { KeySquare, Send, UserRoundPlus } from "lucide-react";
import DefaultButton from "@/components/ui/button/DefaultButton";
import { Tabs, TabsList } from "@radix-ui/react-tabs";
import { useLocation } from "react-router";
import TabContentForm from "@/pages/Authorization/TabContentForm";
import TabButton from "@/pages/Authorization/TabButton";

const Authorization = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const location = useLocation();

  const onSubmitLogin: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const onSubmitReg: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    registration(email, password);
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-50px)]">
      <div
        className="flex flex-col min-w-[500px] w-[45vmin] h-[45vmin] min-h-[500px] rounded-[20px] p-[30px] self-center
                    bg-gradient-to-b
                    from-[#26262694] 0%
                    via-[#61616160] 53%
                    to-[#262626a1] 100%">
        <Tabs
          defaultValue={location.pathname.substring(
            location.pathname.lastIndexOf("/") + 1,
          )}
          className="w-full">
          <TabsList
            className="flex h-20 justify-between items-center gap-5 p-1 rounded-[10px]
                            bg-gradient-to-b
                          from-[#3f3f3f44] 0%
                          via-[#6d6d6d60] 53%
                          to-[#3b3b3ba1] 100%">
            <TabButton path="login">
              <KeySquare color="#de6e57" size={40} />
            </TabButton>
            <TabButton path="registration">
              <UserRoundPlus color="#de6e57" size={40} />
            </TabButton>
            <span
              className="absolute flex p-0 border-0 rounded-[10px] h-[72px] w-[206px]
                          bg-gradient-to-br peer
                        from-[#414141d1] 0%
                        via-[#61616150] 53%
                        to-[#4f4f4f99] 100%
                          transition-transform
                          duration-300
                          peer-data-[state=active]/registration:translate-x-[226px]"
            />
          </TabsList>

          <TabContentForm value="login" onSubmit={onSubmitLogin}>
            <span className="text-[30px] font-bold tracking-wider">
              Authorization
            </span>
            <Input
              id="email"
              autoComplete="email"
              classnameBox="my-2.5 h-16"
              value={email}
              setValue={setEmail}
              type="text"
              placeholder="Enter email..."
            />
            <Input
              id="password"
              autoComplete="current-password"
              classnameBox="my-2.5 h-16"
              value={password}
              setValue={setPassword}
              type="password"
              placeholder="Enter password..."
            />
            <DefaultButton
              type="submit"
              className="ml-auto mt-4 p-4"
              text="SUBMIT">
              <Send color="#de6e57" />
            </DefaultButton>
          </TabContentForm>

          <TabContentForm value="registration" onSubmit={onSubmitReg}>
            <span className="text-[30px] font-bold tracking-wider">
              New account
            </span>
            <Input
              id="email"
              autoComplete="email"
              classnameBox="my-2.5 h-16"
              value={email}
              setValue={setEmail}
              type="text"
              placeholder="Enter email..."
            />
            <Input
              id="password"
              autoComplete="new-password"
              classnameBox="my-2.5 h-16"
              value={password}
              setValue={setPassword}
              type="password"
              placeholder="Enter password..."
            />
            <DefaultButton
              type="submit"
              className="ml-auto mt-4 p-4"
              text="SUBMIT">
              <Send color="#de6e57" />
            </DefaultButton>
          </TabContentForm>
        </Tabs>
      </div>
    </div>
  );
};

export default Authorization;
