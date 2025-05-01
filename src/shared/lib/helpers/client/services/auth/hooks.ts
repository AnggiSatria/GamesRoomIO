import { useMutation } from "@tanstack/react-query";
import { postLogin, postRegister } from "./fetcher";
import {
  IRequestPostLoginUser,
  IRequestPostRegisterUser,
} from "../interfaces/user.interfaces";

export const useCreateLogin = () => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestPostLoginUser) => postLogin(payload),
    mutationKey: ["login-user"],
  });

  return { mutations };
};

export const useCreateRegister = () => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestPostRegisterUser) =>
      postRegister(payload),
    mutationKey: ["register-user"],
  });

  return { mutations };
};
