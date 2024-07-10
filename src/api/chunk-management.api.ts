import { fetchApi } from "@/config/fetchApi";
import { PagedResultDto, PaginationDto } from "@/types/common";
import { DocumentDto } from "@/types/document";

const BASE_URL = "/app/document-chunk";

export const getChunkDocuments = async (params: PaginationDto) => {
  const response = await fetchApi.get<PagedResultDto<DocumentDto>>(
    BASE_URL,
    params
  );

  return response;
};

export const createChunkDocument = async (body: any) => {
  const response = fetchApi.post(BASE_URL, body);

  return response;
};

export const getChunkDocumentById = async (id: string) => {
  const url = BASE_URL + "/" + id;
  const response = fetchApi.get<DocumentDto>(url);
  return response;
};

export const updateChunkDocument = async (id: string, body: any) => {
  const url = BASE_URL + "/" + id;

  const response = fetchApi.put(url, body);
  return response;
};

export const deleteChunkDocument = async (id: string) => {
  const url = BASE_URL + "/" + id;
  const response = fetchApi.delete(url);
  return response;
};
