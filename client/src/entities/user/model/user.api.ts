import { jwtDecode } from 'jwt-decode';

import { getHasSessionToken, sessionApi } from '@/shared/api';

import { User } from './user.types';

export const userApi = {
  registration: async (
    data: { email: string; password: string },
    signal?: AbortController['signal'],
  ) => {
    const { token } = await sessionApi.post<{ token: string }>(
      '/user/registration',
      { ...data, role: 'ADMIN' },
      { signal },
    );

    return { token, user: jwtDecode<User>(token) };
  },

  login: async (data: { email: string; password: string }, signal?: AbortController['signal']) => {
    const { token } = await sessionApi.post<{ token: string }>('/user/login', data, { signal });

    return { token, user: jwtDecode<User>(token) };
  },

  check: async (signal?: AbortController['signal']) => {
    if (!getHasSessionToken()) {
      return { token: '', user: null };
    }

    try {
      const { token } = await sessionApi.get<{ token: string }>('/user/auth', { signal });

      return { token, user: jwtDecode<User>(token) };
    } catch (error) {
      return { token: '', user: null };
    }
  },
};
