import api from "@/shared/config/axios";
import { ENDPOINT } from "../endpoint";
import QueryString from "qs";
import { removeEmptyAttributes } from "../../removeEmptyAttributes";

export const getUsers = (activeFilter: any) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.Root}${ENDPOINT.Users}`, {
    params: { ...queryString },
  });
};

export const getUserById = (activeFilter: any, id: string) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.Root}${ENDPOINT.Users}/${id}`, {
    params: { ...queryString },
  });
};
