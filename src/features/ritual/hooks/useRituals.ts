import { useQuery } from "@tanstack/react-query";
import { ritualService } from "../services";
import type { RitualFilterParams } from "../type";

export const useGetRitualsQuery = () => {
  return useQuery({
    queryKey: ["rituals"],
    queryFn: () => ritualService.getAll(),
  });
};

export function useRituals(params: RitualFilterParams) {
  const query = useQuery({
    queryKey: ["rituals", params],
    queryFn: () => ritualService.getAll(params),
  });
  return {
    rituals: query.data?.data ?? [],
    pagination: query.data?.meta,
    isLoading: query.isLoading,
    error: query.error,
    isHot: query.data?.data,
  };
}
