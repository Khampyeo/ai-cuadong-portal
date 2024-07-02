import axios from "@/config/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import { IResponseListEntity } from "@/types/response.interface";
import { UserType } from "@/types/user.types";

export const getUsers: (
  params: any
) => Promise<IResponseListEntity<UserType>> = async (params: any) => {
  const data = await axios.get(ENDPOINTS.USERS.LIST, {
    params,
  });

  const totalPages = Math.ceil(data.data?.totalCount / params.MaxResultCount);
  const response = {
    status: data.status,
    data: {
      totalPages: totalPages,
      items: data.data.items,
    },
  };
  return response;
};

export const createUser: (body: any) => Promise<any> = async (body: any) => {
  const response = axios.post(ENDPOINTS.USERS.CREATE, body);

  return response;
};
export const getUserById: (id: string) => Promise<any> = async (id: string) => {
  const url = `${ENDPOINTS.USERS.GET_BY_ID.replace("{id}", id)}`;
  const response = axios.get(url);
  return response;
};
export const getRoleUserById: (id: string) => Promise<any> = async (
  id: string
) => {
  const url = `${ENDPOINTS.USERS.GET_ROLE_BY_ID.replace("{id}", id)}`;
  const response = axios.get(url);
  return response;
};
export const updateUser: (id: string, body: any) => Promise<any> = async (
  id: string,
  body: any
) => {
  const url = `${ENDPOINTS.USERS.UPDATE.replace("{id}", id)}`;
  const response = axios.put(url, body);
  return response;
};

export const deleteUser: (id: string) => Promise<any> = async (id: string) => {
  const url = `${ENDPOINTS.USERS.DELETE.replace("{id}", id)}`;
  const response = axios.delete(url);
  return response;
};
