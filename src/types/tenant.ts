import { PagedAndSortedResultRequestDto } from "./common";

export type TenantDto = {
  id: string;
  name: string;
};

export type GetTenantsInput = {
  Filter?: string;
} & PagedAndSortedResultRequestDto;
