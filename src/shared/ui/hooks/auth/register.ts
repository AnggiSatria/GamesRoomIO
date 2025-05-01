import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { IRequestPostRegisterUser } from "@/shared/lib/helpers/client/services/interfaces/user.interfaces";
import { useReadProfiles } from "@/shared/lib/helpers/client/services/profiles";
import { useCreateRegister } from "@/shared/lib/helpers/client/services/auth";
import Cookies from "js-cookie";

export default function useHooksRegister({
  setShowRegister,
}: {
  setShowRegister: (value: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);

  const activeFilter = {
    search: "",
    pagination: "",
  };

  const {
    data: dataProfiles,
    isSuccess,
    isError,
    refetch,
    isLoading,
  } = useReadProfiles(activeFilter);

  const checkUsers = dataProfiles && dataProfiles?.data?.data?.user;

  const formSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().min(1, "Email is required"),
    password: z.string().min(1, "Password is required"),
  });

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const { mutations } = useCreateRegister(setShowRegister);

  const onSubmit = async (e: IRequestPostRegisterUser) => {
    try {
      setLoading(true);

      const response = await mutations.mutateAsync(e);

      if (response?.status === 200 || response?.status === 201) {
        refetch();
      }
      setLoading(false);
    } catch (error: any) {
      setLoading(false);

      toast.error(
        error && error?.response
          ? error && error?.response?.data?.message
          : "Network Error, Please Check Again!"
      );
    }
  };

  return {
    form,
    onSubmit,
    loading,
    checkUsers,
    isLoading,
    isSuccess,
    isError,
  };
}
