import QueryString from "qs";
import { ENDPOINT } from "../endpoint";
import { removeEmptyAttributes } from "../../removeEmptyAttributes";
import api from "@/shared/config/axios";
import { activeFilter } from "../interfaces/global.interface";
import { IRequestPutProfile } from "../interfaces/profile.interfaces";

export const getProfile = (activeFilter: activeFilter) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.Root}${ENDPOINT.User}${ENDPOINT.Profiles}`, {
    params: { ...queryString },
  });
};

export const putProfile = (payload: IRequestPutProfile, id: string) => {
  return api.put(`${ENDPOINT.Root}${ENDPOINT.Profile}/${id}`, payload);
};
