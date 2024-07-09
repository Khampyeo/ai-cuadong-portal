import { fetchApi } from "@/config/fetchApi";
import { EmailingDto, SendTestEmailDto } from "@/types/settings-management";

export const getEmailing = async () => {
  const response = await fetchApi.get<EmailingDto>(
    "/setting-management/emailing"
  );

  return response;
};

export const updateEmailing = async (data: EmailingDto) => {
  const response = await fetchApi.post("/setting-management/emailing", data);

  return response;
};

export const sendTestEmail = async (data: SendTestEmailDto) => {
  const response = await fetchApi.post(
    "/setting-management/emailing/send-test-email",
    data
  );

  return response;
};
