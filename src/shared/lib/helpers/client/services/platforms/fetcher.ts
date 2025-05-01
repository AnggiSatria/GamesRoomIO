import QueryString from "qs";
import { ENDPOINT } from "../endpoint";
import { removeEmptyAttributes } from "../../removeEmptyAttributes";
import api from "@/shared/config/axios";
import { activeFilter } from "../interfaces/global.interface";
import {
  IRequestPostPlatform,
  IRequestPutPlatform,
} from "../interfaces/platform.interfaces";

export const getPlatforms = (activeFilter: activeFilter) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.Root}${ENDPOINT.Platforms}`, {
    params: { ...queryString },
  });
};

export const getPlatformById = (activeFilter: activeFilter, id: string) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.Root}${ENDPOINT.Platform}/${id}`, {
    params: { ...queryString },
  });
};

export const postPlatform = (payload: IRequestPostPlatform) => {
  return api.post(`${ENDPOINT.Root}${ENDPOINT.Platform}`, payload);
};

export const putPlatform = (payload: IRequestPutPlatform, id: string) => {
  return api.put(`${ENDPOINT.Root}${ENDPOINT.Platform}/${id}`, payload);
};

export const deletePlatform = (id: string) => {
  return api.delete(`${ENDPOINT.Root}${ENDPOINT.Platform}/${id}`);
};
