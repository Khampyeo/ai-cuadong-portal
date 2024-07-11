import { fetchApi } from "@/config/fetchApi";
import { FeatureListResultDto } from "@/types/feature";

const BASE_URL = "/feature-management/features";

export const getTenantFeatures = async (tenantId?: string) => {
  const response = await fetchApi.get<FeatureListResultDto>(
    `${BASE_URL}?providerName=T&providerKey=${tenantId || ""}`
  );
  return response;
};

export const updateTenantFeatures = async (
  tenantId: string,
  features: { name: string; value: string }[]
) => {
  const response = await fetchApi.put<FeatureListResultDto>(
    `${BASE_URL}?providerName=T&providerKey=${tenantId || ""}`,
    {
      features: features,
    }
  );
  return response;
};
