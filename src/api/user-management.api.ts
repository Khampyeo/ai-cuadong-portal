import { fetchApi } from "@/config/fetchApi";
import { PagedResultDto } from "@/types/common";
import { RoleDto } from "@/types/role";
import { UserDto } from "@/types/user";

const BASE_URL = "/identity/users";

export const getUsers = async (params: any) => {
  const response = await fetchApi.get<PagedResultDto<UserDto>>(
    BASE_URL,
    params
  );

  return response;
};

export const getAssignableRoles = async () => {
  const response = await fetchApi.get<{ items: RoleDto[] }>(
    BASE_URL + "/assignable-roles"
  );
  return response.items;
};

export const createUser = async (body: any) => {
  const response = fetchApi.post(BASE_URL, body);

  return response;
};

export const getUserById = async (id: string) => {
  const url = BASE_URL + "/" + id;
  const response = fetchApi.get<UserDto>(url);
  return response;
};

export const getUserRoles = async (userId: string) => {
  const url = BASE_URL + "/" + userId + "/roles";
  const response = fetchApi.get<{ items: RoleDto[] }>(url);
  return response;
};

export const updateUser = async (id: string, body: any) => {
  const url = BASE_URL + "/" + id;
  const response = fetchApi.put(url, body);
  return response;
};

export const deleteUser = async (id: string) => {
  const url = BASE_URL + "/" + id;
  const response = fetchApi.delete(url);
  return response;
};
