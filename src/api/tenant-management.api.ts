import { fetchApi } from "@/config/fetchApi";
import { ENDPOINTS } from "@/constants/endpoints";
import { PagedResultDto } from "@/types/common";
import { GetTenantsInput, TenantDto } from "@/types/tenant";

export const getTenants = async (params: GetTenantsInput) => {
  const response = await fetchApi.get<PagedResultDto<TenantDto>>(
    ENDPOINTS.TENANTS.LIST,
    params
  );
  return response;
};

export const createTenant = async (record: TenantDto) => {
  const response = fetchApi.post(ENDPOINTS.TENANTS.CREATE, record);
  return response;
};

export const getTenantById = async (id: string) => {
  const url = `${ENDPOINTS.TENANTS.GET_BY_ID.replace("{id}", id)}`;
  const response = fetchApi.get(url);
  return response;
};

export const updateTenant = async (id: string, record: TenantDto) => {
  const url = `${ENDPOINTS.TENANTS.UPDATE.replace("{id}", id)}`;
  const response = fetchApi.put(url, record);
  return response;
};

export const deleteTenant = async (id: string) => {
  const url = `${ENDPOINTS.TENANTS.DELETE.replace("{id}", id)}`;
  const response = fetchApi.delete(url);
  return response;
};
