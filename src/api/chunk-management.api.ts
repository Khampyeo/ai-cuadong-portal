import { fetchApi } from "@/config/fetchApi";
import { PagedResultDto, PaginationDto } from "@/types/common";
import { DocumentChunkDto } from "@/types/document-chunk";

const BASE_URL = "/app/document-chunk";

export const getChunkDocuments = async (params: PaginationDto) => {
  const response = await fetchApi.get<PagedResultDto<DocumentChunkDto>>(
    BASE_URL,
    params
  );

  return response;
};

export const createChunkDocument = async (body: DocumentChunkDto) => {
  const response = fetchApi.post(BASE_URL, body);

  return response;
};

export const getChunkDocumentById = async (id: string) => {
  const url = BASE_URL + "/" + id;
  const response = fetchApi.get<DocumentChunkDto>(url);
  return response;
};

export const updateChunkDocument = async (id: string, body: DocumentChunkDto) => {
  const url = BASE_URL + "/" + id;

  const response = fetchApi.put(url, body);
  return response;
};

export const deleteChunkDocument = async (id: string) => {
  const url = BASE_URL + "/" + id;
  const response = fetchApi.delete(url);
  return response;
};
