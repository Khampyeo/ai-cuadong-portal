import { PaginationDto } from "./common";

export type RoleDto = {
  id: string;
  name: string;
};

export type GetRolesInput = {
  filter?: string;
} & PaginationDto;

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
