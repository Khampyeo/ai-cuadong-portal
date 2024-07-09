import { fetchApi } from "@/config/fetchApi";
import { ENDPOINTS } from "@/constants/endpoints";
import { PagedResultDto, PaginationDto } from "@/types/common";
import { DocumentDto } from "@/types/document";

export const getChunkDocuments = async (params: PaginationDto) => {
  const response = await fetchApi.get<PagedResultDto<DocumentDto>>(
    ENDPOINTS.CHUNK.LIST,
    params
  );

  return response;
};

export const createChunkDocument = async (body: any) => {
  const response = fetchApi.post(ENDPOINTS.CHUNK.CREATE, body);

  return response;
};

export const getChunkDocumentById = async (id: string) => {
  const url = `${ENDPOINTS.CHUNK.GET_BY_ID.replace("{id}", id)}`;
  const response = fetchApi.get<DocumentDto>(url);
  return response;
};

export const updateChunkDocument = async (id: string, body: any) => {
  const url = `${ENDPOINTS.CHUNK.UPDATE.replace("{id}", id)}`;

  const response = fetchApi.put(url, body);
  return response;
};

export const deleteChunkDocument = async (id: string) => {
  const url = `${ENDPOINTS.CHUNK.DELETE.replace("{id}", id)}`;
  const response = fetchApi.delete(url);
  return response;
};
