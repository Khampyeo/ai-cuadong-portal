import axios from "@/config/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import { IParamsList } from "@/types/common";
import { IDocument } from "@/types/document.interface";
import { IResponseListEntity } from "@/types/response.interface";

export const getDocuments: (
  params: IParamsList
) => Promise<IResponseListEntity<IDocument>> = async (params: IParamsList) => {
  const data = await axios.get(ENDPOINTS.DOCUMENT.LIST, {
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

export const createDocument: (body: any) => Promise<any> = async (
  body: any
) => {
  const response = axios.post(ENDPOINTS.DOCUMENT.CREATE, body);

  return response;
};
export const getDocumentById: (id: string) => Promise<any> = async (
  id: string
) => {
  const url = `${ENDPOINTS.DOCUMENT.GET_BY_ID.replace("{id}", id)}`;
  const response = axios.get(url);
  return response;
};

export const updateDocument: (id: string, body: any) => Promise<any> = async (
  id: string,
  body: any
) => {
  const url = `${ENDPOINTS.DOCUMENT.UPDATE.replace("{id}", id)}`;
  const response = axios.put(url, body);
  return response;
};

export const deleteDocument: (id: string) => Promise<any> = async (
  id: string
) => {
  const url = `${ENDPOINTS.DOCUMENT.DELETE.replace("{id}", id)}`;
  const response = axios.delete(url);
  return response;
};
