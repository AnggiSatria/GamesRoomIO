import { useMutation, useQuery } from "@tanstack/react-query";
import { activeFilter } from "../interfaces/global.interface";
import {
  deleteGenre,
  getGenreById,
  getGenres,
  postGenre,
  putGenre,
} from "./fetcher";
import {
  IRequestPostGenre,
  IRequestPutGenre,
} from "../interfaces/genre.interfaces";

export const useReadGenres = (activeFilter: activeFilter) => {
  return useQuery({
    queryKey: ["get-genres", activeFilter],
    queryFn: async () => await getGenres(activeFilter),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const useReadGenreById = (activeFilter: activeFilter, id: string) => {
  return useQuery({
    queryKey: ["get-genre-by-id", activeFilter, id],
    queryFn: async () => await getGenreById(activeFilter, id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const useCreateGenre = () => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestPostGenre) => postGenre(payload),
    mutationKey: ["create-genre"],
  });

  return { mutations };
};

export const useEditGenre = (id: string) => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestPutGenre) => putGenre(payload, id),
    mutationKey: ["edit-genre"],
  });

  return { mutations };
};

export const useDeletedGenre = () => {
  const mutations = useMutation({
    mutationFn: async (id: string) => deleteGenre(id),
    mutationKey: ["deleted-genre"],
  });

  return { mutations };
};
