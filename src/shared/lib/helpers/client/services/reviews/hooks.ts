import { useMutation, useQuery } from "@tanstack/react-query";
import { activeFilter } from "../interfaces/global.interface";
import {
  deleteReview,
  getReviewById,
  getReviews,
  postReview,
  putReview,
} from "./fetcher";
import {
  IRequestPostReview,
  IRequestPutReview,
} from "../interfaces/review.interfaces";

export const useReadReviews = (activeFilter: activeFilter) => {
  return useQuery({
    queryKey: ["get-reviews", activeFilter],
    queryFn: async () => await getReviews(activeFilter),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const useReadReviewById = (activeFilter: activeFilter, id: string) => {
  return useQuery({
    queryKey: ["get-review-by-id", activeFilter, id],
    queryFn: async () => await getReviewById(activeFilter, id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const useCreateReview = () => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestPostReview) => postReview(payload),
    mutationKey: ["create-review"],
  });

  return { mutations };
};

export const useEditReview = (id: string) => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestPutReview) => putReview(payload, id),
    mutationKey: ["edit-review"],
  });

  return { mutations };
};

export const useDeletedReview = () => {
  const mutations = useMutation({
    mutationFn: async (id: string) => deleteReview(id),
    mutationKey: ["deleted-review"],
  });

  return { mutations };
};
