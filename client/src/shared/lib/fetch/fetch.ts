import { hasProp } from '@/shared/lib/types/utils';

type ClientOptions = {
  baseUrl: string;
  headers?: Record<string, string>;
};

type RequestOptions = {
  params?: Record<string, string | number | undefined>;
  signal?: AbortSignal;
};

export const createApi = (options: ClientOptions) => {
  const request = <T>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'OPTIONS' | 'HEAD',
    url: string,
    data: unknown,
    { signal, params }: RequestOptions = {},
  ) => {
    const headers = {
      ...options.headers,
    };

    if (options.baseUrl) {
      url = url.replace(/^(?!.*\/\/)\/?/, `${options.baseUrl}/`);
    }

    if (params) {
      const paramsObj = new URLSearchParams();

      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) paramsObj.append(key, String(value));
      });

      url += (~url.indexOf('?') ? '&' : '?') + new URLSearchParams(paramsObj);
    }

    if (
      data &&
      typeof data === 'object' &&
      Object.values(data).some((value) => value instanceof File)
    ) {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (typeof value === 'string') {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });

      data = formData;
    } else if (
      data &&
      typeof data === 'object' &&
      typeof (data as FormData).append !== 'function' &&
      typeof (data as Blob).text !== 'function'
    ) {
      data = JSON.stringify(data);
      headers['content-type'] = 'application/json';
    }

    return fetch(url, {
      method,
      body: data as BodyInit | undefined,
      headers,
      signal,
    }).then((res) => {
      let responseData: unknown;

      return res
        .text()
        .then((text) => {
          responseData = text;
          responseData = JSON.parse(text);

          if (!res.ok) throw new Error('Not ok');

          return responseData as T;
        })
        .catch(() => {
          throw new Error(
            (hasProp(responseData, 'message') &&
              typeof responseData.message === 'string' &&
              responseData.message) ||
              'Unknown error',
          );
        });
    });
  };

  return {
    get: <T>(url: string, options?: RequestOptions) => request<T>('GET', url, undefined, options),

    post: <T>(url: string, data?: unknown, options?: RequestOptions) =>
      request<T>('POST', url, data, options),

    put: <T>(url: string, data?: unknown, options?: RequestOptions) =>
      request<T>('PUT', url, data, options),

    delete: <T>(url: string, data?: unknown, options?: RequestOptions) =>
      request<T>('DELETE', url, data, options),
  };
};
