import { PaginationDto } from "./common";

export type TenantDto = {
  id: string;
  name: string;
};

export type GetTenantsInput = {
  Filter?: string;
} & PaginationDto;
