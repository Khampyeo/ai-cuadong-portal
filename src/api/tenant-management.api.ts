import axios from "@/config/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import { GetTenantsInput, TenantDto } from "@/types/tenant";

export const getTenants = async (params: GetTenantsInput) => {
  const data = await axios.get(ENDPOINTS.TENANTS.LIST, {
    params,
  });
  const response = {
    totalCount: data.data?.totalCount,
    items: data.data.items,
  };
  return response;
};

export const createTenant = async (record: TenantDto) => {
  const response = axios.post(ENDPOINTS.TENANTS.CREATE, record);
  return response;
};

export const getTenantById = async (id: string) => {
  const url = `${ENDPOINTS.TENANTS.GET_BY_ID.replace("{id}", id)}`;
  const response = axios.get(url);
  return response;
};

export const updateTenant = async (id: string, record: TenantDto) => {
  const url = `${ENDPOINTS.TENANTS.UPDATE.replace("{id}", id)}`;
  const response = axios.put(url, record);
  return response;
};

export const deleteTenant = async (id: string) => {
  const url = `${ENDPOINTS.TENANTS.DELETE.replace("{id}", id)}`;
  const response = axios.delete(url);
  return response;
};
