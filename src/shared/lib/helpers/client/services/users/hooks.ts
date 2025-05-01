import { useQuery } from "@tanstack/react-query";
import { activeFilter } from "../interfaces/global.interface";
import { getUserById, getUsers } from "./fetcher";

export const useReadUsers = (activeFilter: activeFilter) => {
  return useQuery({
    queryKey: ["get-users", activeFilter],
    queryFn: async () => await getUsers(activeFilter),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};

export const useReadUserById = (activeFilter: activeFilter, id: string) => {
  return useQuery({
    queryKey: ["get-user-by-id", activeFilter, id],
    queryFn: async () => await getUserById(activeFilter, id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: false,
  });
};
