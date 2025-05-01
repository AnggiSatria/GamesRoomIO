import { useMutation, useQuery } from "@tanstack/react-query";
import { activeFilter } from "../interfaces/global.interface";
import {
  deletePlatform,
  getPlatformById,
  getPlatforms,
  postPlatform,
  putPlatform,
} from "./fetcher";
import {
  IRequestPostPlatform,
  IRequestPutPlatform,
} from "../interfaces/platform.interfaces";

export const useReadPlatforms = (activeFilter: activeFilter) => {
  return useQuery({
    queryKey: ["get-platforms", activeFilter],
    queryFn: async () => await getPlatforms(activeFilter),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const useReadPlatformById = (activeFilter: activeFilter, id: string) => {
  return useQuery({
    queryKey: ["get-platform-by-id", activeFilter, id],
    queryFn: async () => await getPlatformById(activeFilter, id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const useCreatePlatform = () => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestPostPlatform) => postPlatform(payload),
    mutationKey: ["create-platform"],
  });

  return { mutations };
};

export const useEditPlatform = (id: string) => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestPutPlatform) =>
      putPlatform(payload, id),
    mutationKey: ["edit-platform"],
  });

  return { mutations };
};

export const useDeletedPlatform = () => {
  const mutations = useMutation({
    mutationFn: async (id: string) => deletePlatform(id),
    mutationKey: ["deleted-platform"],
  });

  return { mutations };
};
