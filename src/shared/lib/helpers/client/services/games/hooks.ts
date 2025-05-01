import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteGame,
  getGameById,
  getGames,
  postGame,
  putGame,
} from "./fetcher";
import { activeFilter } from "../interfaces/global.interface";
import {
  IRequestPostGame,
  IRequestPutGame,
} from "../interfaces/games.interfaces";

export const useReadGames = (activeFilter: activeFilter) => {
  return useQuery({
    queryKey: ["get-games", activeFilter],
    queryFn: async () => await getGames(activeFilter),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const useReadGameById = (activeFilter: activeFilter, id: string) => {
  return useQuery({
    queryKey: ["get-game-by-id", activeFilter],
    queryFn: async () => await getGameById(activeFilter, id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const useCreateGame = () => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestPostGame) => postGame(payload),
    mutationKey: ["create-game"],
  });

  return { mutations };
};

export const useEditGame = (id: string) => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestPutGame) => putGame(payload, id),
    mutationKey: ["edit-game"],
  });

  return { mutations };
};

export const useDeletedGame = () => {
  const mutations = useMutation({
    mutationFn: async (id: string) => deleteGame(id),
    mutationKey: ["deleted-game"],
  });

  return { mutations };
};
