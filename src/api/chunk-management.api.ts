import axios from "@/config/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import { IResponseListEntity } from "@/types/response.interface";
import { ChunkType } from "@/types/chunk.types";
import { IParamsList } from "@/types/common";

export const getChunkDocuments: (
  params: IParamsList
) => Promise<IResponseListEntity<ChunkType>> = async (params: IParamsList) => {
  const data = await axios.get(ENDPOINTS.CHUNK.LIST, {
    params,
  });

  const totalPages = Math.ceil(data.data?.totalCount / params.MaxResultCount);
  const response = {
    status: data.status,
    data: {
      totalPages: totalPages,
      items: data.data.items,
    },
  };
  return response;
};

export const createChunkDocument: (body: any) => Promise<any> = async (
  body: any
) => {
  const response = axios.post(ENDPOINTS.CHUNK.CREATE, body);

  return response;
};
export const getChunkDocumentById: (id: string) => Promise<any> = async (
  id: string
) => {
  const url = `${ENDPOINTS.CHUNK.GET_BY_ID.replace("{id}", id)}`;
  const response = axios.get(url);
  return response;
};

export const updateChunkDocument: (
  id: string,
  body: any
) => Promise<any> = async (id: string, body: any) => {
  const url = `${ENDPOINTS.CHUNK.UPDATE.replace("{id}", id)}`;

  const response = axios.put(url, body);
  return response;
};

export const deleteChunkDocument: (id: string) => Promise<any> = async (
  id: string
) => {
  const url = `${ENDPOINTS.CHUNK.DELETE.replace("{id}", id)}`;
  const response = axios.delete(url);
  return response;
};
