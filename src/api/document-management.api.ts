import axios from "@/config/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import { IParamsList } from "@/types/common";

export const getDocuments = async (params: IParamsList) => {
  const data = await axios.get(ENDPOINTS.DOCUMENT.LIST, {
    params,
  });

  const response = {
    status: data.status,
    data: {
      totalCount: data.data?.totalCount,
      items: data.data.items,
    },
  };
  return response;
};

export const createDocument = async (body: any) => {
  const response = axios.post(ENDPOINTS.DOCUMENT.CREATE, body);

  return response;
};
export const getDocumentById = async (id: string) => {
  const url = `${ENDPOINTS.DOCUMENT.GET_BY_ID.replace("{id}", id)}`;
  const response = axios.get(url);
  return response;
};

export const updateDocument = async (id: string, body: any) => {
  const url = `${ENDPOINTS.DOCUMENT.UPDATE.replace("{id}", id)}`;
  const response = axios.put(url, body);
  return response;
};

export const deleteDocument = async (id: string) => {
  const url = `${ENDPOINTS.DOCUMENT.DELETE.replace("{id}", id)}`;
  const response = axios.delete(url);
  return response;
};
