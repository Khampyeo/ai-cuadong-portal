import { PaginationDto } from "./common";

export type TenantDto = {
  id: string;
  name: string;
};

export type FindTenantResultDto = {
  success: boolean;
  tenantId: string;
  name: string;
  normalizedName: string;
  isActive: boolean;
};

export type GetTenantsInput = {
  Filter?: string;
} & PaginationDto;
