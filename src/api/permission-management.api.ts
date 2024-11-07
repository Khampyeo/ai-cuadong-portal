import { fetchApi } from "@/config/fetchApi";
import { GetPermissionListResultDto } from "@/types/role";

const BASE_URL = "/permission-management/permissions";

export const getRolePermissions = async (roleName: string) => {
  const url = `${BASE_URL}?providerName=R&providerKey=${roleName}`;
  const response = await fetchApi.get<GetPermissionListResultDto>(url);
  return response;
};

export const updateRolePermissions = async (
  roleName: string,
  permissions: { name: string; isGranted: boolean }[]
) => {
  const url = `${BASE_URL}?providerName=R&providerKey=${roleName}`;
  await fetchApi.put<GetPermissionListResultDto>(url, {
    permissions: permissions,
  });
};
