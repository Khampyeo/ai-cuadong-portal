import { fetchApi } from "@/config/fetchApi";
import { ENDPOINTS } from "@/constants/endpoints";
import { PagedResultDto, PaginationDto } from "@/types/common";
import { DocumentDto } from "@/types/document";

export const getDocuments = async (params: PaginationDto) => {
  const response = await fetchApi.get<PagedResultDto<DocumentDto>>(
    ENDPOINTS.DOCUMENT.LIST,
    params
  );

  return response;
};

export const createDocument = async (body: any) => {
  const response = fetchApi.post(ENDPOINTS.DOCUMENT.CREATE, body);

  return response;
};
export const getDocumentById = async (id: string) => {
  const url = `${ENDPOINTS.DOCUMENT.GET_BY_ID.replace("{id}", id)}`;
  const response = fetchApi.get<DocumentDto>(url);
  return response;
};

export const updateDocument = async (id: string, body: any) => {
  const url = `${ENDPOINTS.DOCUMENT.UPDATE.replace("{id}", id)}`;
  const response = fetchApi.put(url, body);
  return response;
};

export const deleteDocument = async (id: string) => {
  const url = `${ENDPOINTS.DOCUMENT.DELETE.replace("{id}", id)}`;
  const response = fetchApi.delete(url);
  return response;
};
