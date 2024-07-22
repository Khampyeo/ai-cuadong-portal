const BASE_URL = "/api";
export const offerConnection = async (body: GetOfferConnectionParams) => {
  const response = await fetch(BASE_URL + `/virtual-assistant/offer`, {
    method: "POST",
    body: JSON.stringify(body),
  });

  return response;
};
