import api from "@/shared/config/axios";
import { ENDPOINT } from "../endpoint";
import QueryString from "qs";
import { removeEmptyAttributes } from "../../removeEmptyAttributes";
import { activeFilter } from "../interfaces/global.interface";

export const getUsers = (activeFilter: activeFilter) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.Root}${ENDPOINT.Users}`, {
    params: { ...queryString },
  });
};

export const getUserById = (activeFilter: activeFilter, id: string) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.Root}${ENDPOINT.Users}/${id}`, {
    params: { ...queryString },
  });
};
