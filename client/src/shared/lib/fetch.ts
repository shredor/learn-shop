import { API_URL } from '@/shared/config';

const getAuthTokenFromStorage = () => localStorage.getItem('authToken') || '';

const saveAuthTokenToStorage = (token: string | null) =>
  token ? localStorage.setItem('authToken', token) : localStorage.removeItem('authToken');

let authToken = getAuthTokenFromStorage();

export const setAuthToken = (token: string | null) => {
  authToken = token || '';
  saveAuthTokenToStorage(token);
};

export const getHasAuthToken = () => !!authToken;

class ApiError extends Error {
  data: Record<string, unknown>;

  constructor(message: string, data: Record<string, unknown>) {
    super(message);
    this.data = data;
  }
}

const wrapFetch = (method: string) => (path: string, body?: unknown) => {
  let preparedPath = path;
  if (method === 'GET' && body && Object.keys(body).length) {
    const queryString = Object.entries(body)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
    preparedPath = `${path}?${queryString}`;
  }

  let bodyInit: BodyInit | undefined = undefined;
  let contentTypeHeader: Record<string, string> = {};

  if (body && method !== 'GET') {
    const hasFiles = body && Object.values(body).some((value) => value instanceof File);

    if (hasFiles) {
      const formData = new FormData();
      Object.entries(body).forEach(([key, value]) => {
        if (value instanceof File) {
          formData.append(key, value);
        } else if (typeof value === 'string') {
          formData.append(key, value);
        } else {
          formData.append(key, JSON.stringify(value));
        }
      });

      bodyInit = formData;
    } else {
      bodyInit = JSON.stringify(body);
      contentTypeHeader = { 'Content-Type': 'application/json' };
    }
  }

  const authHeaders: Record<string, string> = authToken
    ? { Authorization: `Bearer ${authToken}` }
    : {};

  return fetch(`${API_URL}${preparedPath}`, {
    method,
    headers: {
      ...authHeaders,
      ...contentTypeHeader,
    },
    body: bodyInit,
  }).then(async (response) => {
    if (response.ok) {
      return response.json();
    } else {
      const errorData = await response.json().catch(() => ({}));
      const error = new ApiError(errorData.message || 'Network response was not ok', errorData);
      throw error;
    }
  });
};

export const api = {
  get: wrapFetch('GET'),
  post: wrapFetch('POST'),
  put: wrapFetch('PUT'),
  delete: wrapFetch('DELETE'),
};
