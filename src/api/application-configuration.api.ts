import axios from "@/config/axios";
import { ApplicationConfiguration } from "@/types/application-configuration";

export const getApplicationConfiguration = async (
  includeLocalizationResources?: boolean
) => {
  return await axios.get<ApplicationConfiguration>(
    `/abp/application-configuration?includeLocalizationResources=${includeLocalizationResources || false}`
  );
};
