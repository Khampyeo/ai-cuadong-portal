import { fetchApi } from "@/config/fetchApi";
import { PagedResultDto } from "@/types/common";
import { GetRolesInput, RoleDto } from "@/types/role";

const BASE_URL = "/identity/roles";

export const getRoles = async (params?: GetRolesInput) => {
  const response = await fetchApi.get<PagedResultDto<RoleDto>>(
    BASE_URL,
    params
  );

  return response;
};

export const createRole = async (record: RoleDto) => {
  const response = fetchApi.post(BASE_URL, record);
  return response;
};

export const getRoleById = async (id: string) => {
  const url = BASE_URL + "/" + id;
  const response = fetchApi.get(url);
  return response;
};

export const updateRole = async (id: string, record: RoleDto) => {
  const url = BASE_URL + "/" + id;
  const response = fetchApi.put(url, record);
  return response;
};

export const deleteRole = async (id: string) => {
  const url = BASE_URL + "/" + id;
  const response = fetchApi.delete(url);
  return response;
};
