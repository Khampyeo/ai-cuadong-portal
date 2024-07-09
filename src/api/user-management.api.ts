import { fetchApi } from "@/config/fetchApi";
import { ENDPOINTS } from "@/constants/endpoints";
import { PagedResultDto } from "@/types/common";
import { RoleDto } from "@/types/role";
import { UserDto } from "@/types/user";

export const getUsers = async (params: any) => {
  const response = await fetchApi.get<PagedResultDto<UserDto>>(
    ENDPOINTS.USERS.LIST,
    params
  );

  return response;
};

export const getAssignableRoles = async () => {
  const response = await fetchApi.get<{ items: RoleDto[] }>(
    ENDPOINTS.USERS.ASSIGNABLE_ROLES
  );
  return response.items;
};

export const createUser = async (body: any) => {
  const response = fetchApi.post(ENDPOINTS.USERS.CREATE, body);

  return response;
};

export const getUserById = async (id: string) => {
  const url = `${ENDPOINTS.USERS.GET_BY_ID.replace("{id}", id)}`;
  const response = fetchApi.get<UserDto>(url);
  return response;
};

export const getUserRoles = async (userId: string) => {
  const url = `${ENDPOINTS.USERS.GET_ROLE_BY_ID.replace("{id}", userId)}`;
  const response = fetchApi.get<{ items: RoleDto[] }>(url);
  return response;
};

export const updateUser = async (id: string, body: any) => {
  const url = `${ENDPOINTS.USERS.UPDATE.replace("{id}", id)}`;
  const response = fetchApi.put(url, body);
  return response;
};

export const deleteUser = async (id: string) => {
  const url = `${ENDPOINTS.USERS.DELETE.replace("{id}", id)}`;
  const response = fetchApi.delete(url);
  return response;
};
