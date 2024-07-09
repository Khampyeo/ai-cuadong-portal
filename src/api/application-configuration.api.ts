import { fetchApi } from "@/config/fetchApi";
import { ApplicationConfiguration } from "@/types/application-configuration";

export const getApplicationConfiguration = async (
  includeLocalizationResources?: boolean
) => {
  return await fetchApi.get<ApplicationConfiguration>(
    `/abp/application-configuration?includeLocalizationResources=${includeLocalizationResources || false}`
  );
};
