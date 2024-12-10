import axios from "axios";
import { setUser } from "@/reducers/userReducer";
import { API_URL } from "@/config";
import { IUser } from "@/types/user";
import { DispatchType } from "@/reducers";

export const registration = (email: string, password: string) => {
  type IRes = {
    token: string;
    message: string;
  };
  try {
    axios
      .post<IRes>(
        "/auth/registration",
        {
          email,
          password,
        },
        { baseURL: API_URL },
      )
      .then(response => alert(response.data.message));
  } catch (e) {
    // @ts-ignore
    alert(e.response.data.message);
  }
};

export const login = (email: string, password: string) => {
  return async (dispatch: DispatchType) => {
    type IRes = {
      token: string;
      user: IUser;
    };
    try {
      const response = await axios.post<IRes>(
        "/auth/login",
        {
          email,
          password,
        },
        { baseURL: API_URL },
      );
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      // @ts-ignore
      alert(e.response.data.message);
    }
  };
};

export const auth = () => {
  return async (dispatch: DispatchType) => {
    type IRes = {
      token: string;
      user: IUser;
    };
    try {
      const response = await axios.get<IRes>("/auth/auth", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        baseURL: API_URL,
      });
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      localStorage.removeItem("token");
    }
  };
};
