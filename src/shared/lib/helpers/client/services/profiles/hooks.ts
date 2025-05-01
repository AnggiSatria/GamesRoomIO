import { useMutation, useQuery } from "@tanstack/react-query";
import { activeFilter } from "../interfaces/global.interface";
import { getProfile, putProfile } from "./fetcher";
import { IRequestPutProfile } from "../interfaces/profile.interfaces";

export const useReadProfiles = (activeFilter: activeFilter) => {
  return useQuery({
    queryKey: ["get-profiles", activeFilter],
    queryFn: async () => await getProfile(activeFilter),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const useEditProfile = (id: string) => {
  const mutations = useMutation({
    mutationFn: async (payload: IRequestPutProfile) => putProfile(payload, id),
    mutationKey: ["edit-Profile"],
  });

  return { mutations };
};
