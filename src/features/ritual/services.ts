import apiClient from "@/lib/axios";
import type {
  CreateRitualDto,
  RitualFilterParams,
  Ritual,
  UpdateRitualDto,
} from "./type";
import { createBaseService } from "@/shared/services/BaseService";
import { env } from "@/lib/env";

export const ritualService = createBaseService<
  Ritual,
  CreateRitualDto,
  UpdateRitualDto,
  RitualFilterParams
>({
  endpoint: "ritual",
  remove: async (id) => {
    await apiClient.patch(`${env}/${id}/soft-remove`);
  },
});
