import { fetchApi } from "@/config/fetchApi";
import { FindTenantResultDto } from "@/types/tenant";

const BASE_URL = "/abp/multi-tenancy/tenants";

export const findTenantById = async (id: string) => {
  const url = `${BASE_URL}/by-id/${id}`;
  const response = fetchApi.get<FindTenantResultDto>(url);
  return response;
};

export const findTenantByName = async (name: string) => {
  const url = `${BASE_URL}/by-name/${name}`;
  const response = fetchApi.get<FindTenantResultDto>(url);
  return response;
};
