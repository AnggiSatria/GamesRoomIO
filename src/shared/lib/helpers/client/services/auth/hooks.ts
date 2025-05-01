import { useMutation } from "@tanstack/react-query";
import { postLogin, postRegister } from "./fetcher";
import {
  IRequestPostLoginUser,
  IRequestPostRegisterUser,
} from "../interfaces/user.interfaces";
import { toast } from "sonner";
import Cookies from "js-cookie";

export const useCreateLogin = (setShowLogin: (value: boolean) => void) => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestPostLoginUser) => postLogin(payload),
    mutationKey: ["login-user"],
    onSuccess: (res) => {
      Cookies.set("token", res?.data?.token);
      setShowLogin(false);
      toast.success(
        res && res?.data ? res && res?.data?.message : "Login Success"
      );
    },
  });

  return { mutations };
};

export const useCreateRegister = (
  setShowRegister: (value: boolean) => void
) => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestPostRegisterUser) =>
      postRegister(payload),
    mutationKey: ["register-user"],
    onSuccess: (res) => {
      Cookies.set("token", res?.data?.token);
      setShowRegister(false);
      toast.success(
        res && res?.data ? res && res?.data?.message : "Register Success"
      );
    },
  });

  return { mutations };
};
