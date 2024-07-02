import axios from "@/config/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import { PagedResultDto } from "@/types/common";
import {
  GetPermissionListResultDto,
  GetRolesInput,
  RoleDto,
} from "@/types/role";

export const getRoles: (
  params?: GetRolesInput
) => Promise<PagedResultDto<RoleDto>> = async (params?: GetRolesInput) => {
  const data = await axios.get(ENDPOINTS.ROLES.LIST, {
    params,
  });
  const response = {
    totalCount: data.data?.totalCount,
    items: data.data.items,
  };
  return response;
};

export const createRole: (record: RoleDto) => Promise<any> = async (
  record: RoleDto
) => {
  const response = axios.post(ENDPOINTS.ROLES.CREATE, record);
  return response;
};

export const getRoleById: (id: string) => Promise<any> = async (id: string) => {
  const url = `${ENDPOINTS.ROLES.GET_BY_ID.replace("{id}", id)}`;
  const response = axios.get(url);
  return response;
};

export const updateRole: (id: string, record: RoleDto) => Promise<any> = async (
  id: string,
  record: RoleDto
) => {
  const url = `${ENDPOINTS.ROLES.UPDATE.replace("{id}", id)}`;
  const response = axios.put(url, record);
  return response;
};

export const deleteRole: (id: string) => Promise<any> = async (id: string) => {
  const url = `${ENDPOINTS.ROLES.DELETE.replace("{id}", id)}`;
  const response = axios.delete(url);
  return response;
};

export const getRolePermissions: (
  roleName: string
) => Promise<GetPermissionListResultDto> = async (roleName: string) => {
  const url = `${ENDPOINTS.ROLES.GET_PERMISSIONS}?providerName=R&providerKey=${roleName}`;
  const response = await axios.get<GetPermissionListResultDto>(url);
  return response.data;
};

export const updateRolePermissions: (
  roleName: string,
  permissions: { name: string; isGranted: boolean }[]
) => Promise<void> = async (
  roleName: string,
  permissions: { name: string; isGranted: boolean }[]
) => {
  const url = `${ENDPOINTS.ROLES.UPDATE_PERMISSIONS}?providerName=R&providerKey=${roleName}`;
  await axios.put<GetPermissionListResultDto>(url, {
    permissions: permissions,
  });
};
