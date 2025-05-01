import QueryString from "qs";
import { ENDPOINT } from "../endpoint";
import { removeEmptyAttributes } from "../../removeEmptyAttributes";
import api from "@/shared/config/axios";
import { activeFilter } from "../interfaces/global.interface";
import {
  IRequestPostGenre,
  IRequestPutGenre,
} from "../interfaces/genre.interfaces";

export const getGenres = (activeFilter: activeFilter) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.Root}${ENDPOINT.Genres}`, {
    params: { ...queryString },
  });
};

export const getGenreById = (activeFilter: activeFilter, id: string) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.Root}${ENDPOINT.Genre}/${id}`, {
    params: { ...queryString },
  });
};

export const postGenre = (payload: IRequestPostGenre) => {
  return api.post(`${ENDPOINT.Root}${ENDPOINT.Game}`, payload);
};

export const putGenre = (payload: IRequestPutGenre, id: string) => {
  return api.put(`${ENDPOINT.Root}${ENDPOINT.Genre}/${id}`, payload);
};

export const deleteGenre = (id: string) => {
  return api.delete(`${ENDPOINT.Root}${ENDPOINT.Genre}/${id}`);
};
