import axios from "@/config/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import { IParamsList } from "@/types/common";

export const getChunkDocuments = async (params: IParamsList) => {
  const data = await axios.get(ENDPOINTS.CHUNK.LIST, {
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

export const createChunkDocument = async (body: any) => {
  const response = axios.post(ENDPOINTS.CHUNK.CREATE, body);

  return response;
};

export const getChunkDocumentById = async (id: string) => {
  const url = `${ENDPOINTS.CHUNK.GET_BY_ID.replace("{id}", id)}`;
  const response = axios.get(url);
  return response;
};

export const updateChunkDocument = async (id: string, body: any) => {
  const url = `${ENDPOINTS.CHUNK.UPDATE.replace("{id}", id)}`;

  const response = axios.put(url, body);
  return response;
};

export const deleteChunkDocument = async (id: string) => {
  const url = `${ENDPOINTS.CHUNK.DELETE.replace("{id}", id)}`;
  const response = axios.delete(url);
  return response;
};
