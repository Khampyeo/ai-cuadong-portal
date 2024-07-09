import { fetchApi } from "@/config/fetchApi";
import { ENDPOINTS } from "@/constants/endpoints";
import { PagedResultDto } from "@/types/common";
import {
  GetPermissionListResultDto,
  GetRolesInput,
  RoleDto,
} from "@/types/role";

export const getRoles = async (params?: GetRolesInput) => {
  const response = await fetchApi.get<PagedResultDto<RoleDto>>(
    ENDPOINTS.ROLES.LIST,
    params
  );

  return response;
};

export const createRole = async (record: RoleDto) => {
  const response = fetchApi.post(ENDPOINTS.ROLES.CREATE, record);
  return response;
};

export const getRoleById = async (id: string) => {
  const url = `${ENDPOINTS.ROLES.GET_BY_ID.replace("{id}", id)}`;
  const response = fetchApi.get(url);
  return response;
};

export const updateRole = async (id: string, record: RoleDto) => {
  const url = `${ENDPOINTS.ROLES.UPDATE.replace("{id}", id)}`;
  const response = fetchApi.put(url, record);
  return response;
};

export const deleteRole = async (id: string) => {
  const url = `${ENDPOINTS.ROLES.DELETE.replace("{id}", id)}`;
  const response = fetchApi.delete(url);
  return response;
};

export const getRolePermissions = async (roleName: string) => {
  const url = `${ENDPOINTS.ROLES.GET_PERMISSIONS}?providerName=R&providerKey=${roleName}`;
  const response = await fetchApi.get<GetPermissionListResultDto>(url);
  return response;
};

export const updateRolePermissions = async (
  roleName: string,
  permissions: { name: string; isGranted: boolean }[]
) => {
  const url = `${ENDPOINTS.ROLES.UPDATE_PERMISSIONS}?providerName=R&providerKey=${roleName}`;
  await fetchApi.put<GetPermissionListResultDto>(url, {
    permissions: permissions,
  });
};
