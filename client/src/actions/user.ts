import axios from "axios";
import { setUser } from "@/reducers/userReducer";
import { API_URL } from "@/config";
import { IUser } from "@/types/user";
import { DispatchType } from "@/reducers";

export const registration = async (email: string, password: string) => {
  type IRes = {
    token: string,
    message: string
  }
  try {
    const response = await axios.post<IRes>(`${API_URL}api/auth/registration`, {
      email,
      password
    });
    alert(response.data.message);
  } catch (e) {
    // @ts-ignore
    alert(e.response.data.message);
  }
};

export const login = (email: string, password: string) => {
  return async (dispatch: DispatchType) => {
    type IRes = {
      token: string,
      user: IUser
    }
    try {
      const response = await axios.post<IRes>(`${API_URL}api/auth/login`, {
        email,
        password
      });
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
      token: string,
      user: IUser
    }
    try {
      const response = await axios.get<IRes>(`${API_URL}api/auth/auth`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      dispatch(setUser(response.data.user));
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      localStorage.removeItem("token");
    }
  };
};
