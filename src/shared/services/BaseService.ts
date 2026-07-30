import type { AxiosInstance } from "axios";
import type { PaginatedResponse, SelectOption } from "../types";
import apiClient from "@/lib/axios";
import { en } from "zod/v4/locales";
import type { Primitive } from "react-hook-form";

export interface BaseServiceConfig<
  TEntity, //Type cua entity chinh CD: user, retual
  TCreateDo,
  TUpdateDto,
  TFilterParams,
> {
  endpoint: string;
  axios?: AxiosInstance;

  getAll?: (params?: TFilterParams) => Promise<PaginatedResponse<TEntity>>;
  getById?: (id: string | number) => Promise<TEntity>;
  create?: (data: TCreateDo) => Promise<TCreateDo>;
  update?: (id: string | number, data: TUpdateDto) => Promise<TEntity>;
  remove?: (id: string | number) => Promise<void>;
  getSelectOptions?: () => Promise<SelectOption[]>;
}

export interface BaseService<
  TEntity, //Type cua entity chinh CD: user, rituals
  TCreateDo,
  TUpdateDto,
  TFilterParams,
> {
  getAll: (params?: TFilterParams) => Promise<PaginatedResponse<TEntity>>;
  getById: (id: string | number) => Promise<TEntity>;
  create: (data: TCreateDo) => Promise<TCreateDo>;
  update: (id: string | number, data: TUpdateDto) => Promise<TEntity>;
  remove: (id: string | number) => Promise<void>;
  getSelectOptions: () => Promise<SelectOption[]>;
}

export function createBaseService<
  TEntity, //Type cua entity chinh CD: user, rituals
  //Partial là một type sẽ biến tất cả các filed của type được truyền vào thành optionnal ( :? )
  //để làm gì ? ->
  TCreateDto = Partial<TEntity>,
  TUpdateDto = Partial<TEntity>,
  TFilterParams = Partial<string | unknown>,
>(
  config: BaseServiceConfig<TEntity, TCreateDto, TUpdateDto, TFilterParams>,
): BaseService<TEntity, TCreateDto, TUpdateDto, TFilterParams> {
  const axios = config.axios ?? apiClient;
  const endpoint = config.endpoint;

  return {
    getAll:
      config.getAll ??
      (async (params?: TFilterParams) => {
        return (await axios.get<PaginatedResponse<TEntity>>(endpoint, {
          params,
        })) as unknown as Promise<PaginatedResponse<TEntity>>;
      }),

    getById:
      config.getById ??
      (async (id: string | number) => {
        return (await axios.get<TEntity>(
          `${endpoint}/${id}`,
        )) as unknown as Promise<TEntity>;
      }),

    create:
      config.create ??
      (async (dto: TCreateDto) => {
        return (await axios.post<TCreateDto>(endpoint, {
          dto,
        })) as unknown as Promise<TCreateDto>;
      }),

    update:
      config.update ??
      (async (id: string | number, dto: TUpdateDto) => {
        return (await axios.put<TEntity>(
          `${endpoint}/${id}`,
          dto,
        )) as unknown as Promise<TEntity>;
      }),

    remove:
      config.remove ??
      (async (id: string | number) => {
        await axios.delete(`${endpoint}/${id}`);
      }),

    getSelectOptions:
      config.getSelectOptions ??
      (async () => {
        return (await axios.get(`${endpoint}/select`)) as unknown as Promise<
          SelectOption[]
        >;
      }),
  };
}
