import api from "@/shared/config/axios";
import { ENDPOINT } from "../endpoint";
import {
  IRequestPostLoginUser,
  IRequestPostRegisterUser,
} from "../interfaces/user.interfaces";

export const postLogin = (payload: IRequestPostLoginUser) => {
  return api.post(`${ENDPOINT.Root}${ENDPOINT.Auth}/login`, payload);
};

export const postRegister = (payload: IRequestPostRegisterUser) => {
  return api.post(`${ENDPOINT.Root}${ENDPOINT.Auth}/register`, payload);
};
