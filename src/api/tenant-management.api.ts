import { fetchApi } from "@/config/fetchApi";
import { PagedResultDto } from "@/types/common";
import { GetTenantsInput, TenantDto } from "@/types/tenant";

const BASE_URL = "/multi-tenancy/tenants";

export const getTenants = async (params: GetTenantsInput) => {
  const response = await fetchApi.get<PagedResultDto<TenantDto>>(
    BASE_URL,
    params
  );
  return response;
};

export const createTenant = async (record: TenantDto) => {
  const response = fetchApi.post(BASE_URL, record);
  return response;
};

export const getTenantById = async (id: string) => {
  const url = `${BASE_URL}/${id}}`;
  const response = fetchApi.get(url);
  return response;
};

export const updateTenant = async (id: string, record: TenantDto) => {
  const url = `${BASE_URL}/${id}}`;
  const response = fetchApi.put(url, record);
  return response;
};

export const deleteTenant = async (id: string) => {
  const url = `${BASE_URL}/${id}}`;
  const response = fetchApi.delete(url);
  return response;
};
