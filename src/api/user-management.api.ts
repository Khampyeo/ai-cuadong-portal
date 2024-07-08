import axios from "@/config/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import { PagedResultDto } from "@/types/common";
import { RoleDto } from "@/types/role";
import { UserDto } from "@/types/user";

export const getUsers = async (params: any) => {
  const data = await axios.get<PagedResultDto<UserDto>>(ENDPOINTS.USERS.LIST, {
    params,
  });

  const response = {
    totalCount: data.data?.totalCount,
    items: data.data.items,
  };
  return response;
};

export const getAssignableRoles = async () => {
  const response = await axios.get<{ items: RoleDto[] }>(
    ENDPOINTS.USERS.ASSIGNABLE_ROLES
  );
  return response.data.items;
};

export const createUser = async (body: any) => {
  const response = axios.post(ENDPOINTS.USERS.CREATE, body);

  return response;
};

export const getUserById = async (id: string) => {
  const url = `${ENDPOINTS.USERS.GET_BY_ID.replace("{id}", id)}`;
  const response = axios.get(url);
  return response;
};

export const getUserRoles = async (userId: string) => {
  const url = `${ENDPOINTS.USERS.GET_ROLE_BY_ID.replace("{id}", userId)}`;
  const response = axios.get(url);
  return response;
};

export const updateUser = async (id: string, body: any) => {
  const url = `${ENDPOINTS.USERS.UPDATE.replace("{id}", id)}`;
  const response = axios.put(url, body);
  return response;
};

export const deleteUser = async (id: string) => {
  const url = `${ENDPOINTS.USERS.DELETE.replace("{id}", id)}`;
  const response = axios.delete(url);
  return response;
};
