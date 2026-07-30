import type {
  BaseFilterParams,
  PaginatedResponse,
  SelectOption,
} from "@/shared/types";

export interface Ritual {
  id: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string;
  updatedBy: string;
  deletedAt: string | null;
  name: string;
  timeOfExecution: string | null;
  dateLunar: string;
  dateSolar: string;
  difficultyLevel: "dễ" | "trung bình" | "khó" | "rất khó";
  description: string;
  content: string;
  reference: string;
  isHot: boolean;
  ritualCategoryId: string;
  ritualMedias: [ritualMedias];
  ritualTags: [];
}

export interface CreateRitualDto {
  name: string;
  dateLunar: string;
  dateSolar?: string;
  timeOfExecution?: string;
  difficultyLevel: string;
  description?: string;
  content?: string;
  reference?: string;
  isHot?: boolean;
  ritualCategoryId?: string;
}

export type ritualMedias = {
  alt: string;
  id: string;
  type: string;
  url: string;
};

export type RitualSelectOption = SelectOption;

export type UpdateRitualDto = Partial<CreateRitualDto>;

export interface RitualFilterParams extends BaseFilterParams {
  difficultyLevel?: string;
  isHot?: boolean;
  ritualCategoryId?: string;
}

export type RitualListRespone = PaginatedResponse<Ritual>;
