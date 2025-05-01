import QueryString from "qs";
import { ENDPOINT } from "../endpoint";
import { removeEmptyAttributes } from "../../removeEmptyAttributes";
import api from "@/shared/config/axios";
import { activeFilter } from "../interfaces/global.interface";
import {
  IRequestPostReview,
  IRequestPutReview,
} from "../interfaces/review.interfaces";

export const getReviews = (activeFilter: activeFilter) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.Root}${ENDPOINT.Reviews}`, {
    params: { ...queryString },
  });
};

export const getReviewById = (activeFilter: activeFilter, id: string) => {
  const queryString = QueryString.parse(removeEmptyAttributes(activeFilter));
  return api.get(`${ENDPOINT.Root}${ENDPOINT.Review}/${id}`, {
    params: { ...queryString },
  });
};

export const postReview = (payload: IRequestPostReview) => {
  return api.post(`${ENDPOINT.Root}${ENDPOINT.Review}`, payload);
};

export const putReview = (payload: IRequestPutReview, id: string) => {
  return api.put(`${ENDPOINT.Root}${ENDPOINT.Review}/${id}`, payload);
};

export const deleteReview = (id: string) => {
  return api.delete(`${ENDPOINT.Root}${ENDPOINT.Review}/${id}`);
};
