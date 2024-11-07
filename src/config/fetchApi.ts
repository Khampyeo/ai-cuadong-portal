import { ResponseError } from "@/types/common";
import { toQueryString } from "@/utils/toQueryString";

const baseURL = "/api";

const fetchApi = async <T>(path: string, options: RequestInit) => {
  const localOptions = options || {};
  localOptions.headers = {
    ...options.headers,
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

  const response = await fetch(apiUrl + baseURL + path, localOptions);

  const contentType = response.headers.get("Content-Type");

  if (!response.ok) {
    if (response.status === 401) {
      window.location.href =
        "/login?redirect=" + encodeURIComponent(window.location.pathname);

      return Promise.reject("401 Unauthorized");
    }

    if (response.status === 400 || response.status == 500) {
      if (contentType?.startsWith("application/json")) {
        const data = await response.json();
        const error = data as ResponseError;
        if (error?.error) {
          if (error.error.message) {
            return Promise.reject(error.error.message);
          }
        }
      }
    }

    return Promise.reject("General error.");
  }

  if (contentType?.startsWith("application/json")) {
    const data = await response.json();
    return data as T;
  }

  if (contentType?.startsWith("text/plain")) {
    const data = await response.text();
    return data as T;
  }

  return response as T;
};

fetchApi.get = <T>(path: string, params?: Record<string, any>) => {
  const query = params ? "?" + toQueryString(params) : "";
  return fetchApi<T>(path + query, {
    method: "GET",
  });
};

fetchApi.post = <T>(path: string, data: any) => {
  return fetchApi<T>(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
  });
};

fetchApi.put = <T>(path: string, data: any) => {
  return fetchApi<T>(path, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: data ? JSON.stringify(data) : null,
  });
};

fetchApi.delete = <T>(path: string, params?: Record<string, any>) => {
  const query = params ? "?" + toQueryString(params) : "";
  return fetchApi<T>(path + query, {
    method: "DELETE",
  });
};

export { fetchApi };
