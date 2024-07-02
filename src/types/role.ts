import { PagedAndSortedResultRequestDto } from "./common";

export type RoleDto = {
  id: string;
  name: string;
};

export type GetRolesInput = {
  Filter?: string;
} & PagedAndSortedResultRequestDto;

export type PermissionGrantInfoDto = {
  name: string;
  displayName: string;
  parentName?: string;
  isGranted: boolean;
};

export type PermissionGroupDto = {
  name: string;
  displayName: string;
  displayNameKey: string;
  displayNameResource: string;
  permissions: PermissionGrantInfoDto[];
};

export type GetPermissionListResultDto = {
  entityDisplayName: string;
  groups: PermissionGroupDto[];
};
