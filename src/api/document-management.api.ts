import { fetchApi } from "@/config/fetchApi";
import { PagedResultDto, PaginationDto } from "@/types/common";
import { DocumentDto } from "@/types/document";

const BASE_URL = "/app/document";

export const getDocuments = async (params: PaginationDto) => {
  const response = await fetchApi.get<PagedResultDto<DocumentDto>>(
    BASE_URL,
    params
  );

  return response;
};

export const createDocument = async (body: any) => {
  const response = fetchApi.post(BASE_URL, body);

  return response;
};
export const getDocumentById = async (id: string) => {
  const url = BASE_URL + "/" + id;
  const response = fetchApi.get<DocumentDto>(url);
  return response;
};

export const updateDocument = async (id: string, body: any) => {
  const url = BASE_URL + "/" + id;
  const response = fetchApi.put(url, body);
  return response;
};

export const deleteDocument = async (id: string) => {
  const url = BASE_URL + "/" + id;
  const response = fetchApi.delete(url);
  return response;
};
