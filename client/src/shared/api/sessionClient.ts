import { API_URL } from '@/shared/config/env';
import { createApi } from '@/shared/lib/fetch/fetch';

let sessionToken: string | null = null;

export const getSessionToken = () => {
  if (sessionToken === null) {
    sessionToken = '';

    if (typeof localStorage !== 'undefined') {
      try {
        sessionToken = localStorage.getItem('sessionToken') || '';
      } catch {
        //
      }
    }
  }

  return sessionToken;
};

export const setSessionToken = (newToken: string) => {
  if (typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem('sessionToken', newToken);
    } catch {
      //
    }
  }

  sessionToken = newToken;
};

export const getHasSessionToken = () => !!getSessionToken();

export const sessionApi = createApi({
  baseUrl: API_URL,
  get headers(): Record<string, string> {
    const token = getSessionToken();

    return token ? { authorization: `Bearer ${token}` } : ({} as const);
  },
});
