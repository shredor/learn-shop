import { jwtDecode } from 'jwt-decode';

import { api, getHasAuthToken, setAuthToken } from '@/shared/lib/fetch';

export const userApi = {
  registration: async (email: string, password: string) => {
    const { token } = await api.post('/user/registration', { email, password, role: 'ADMIN' });
    setAuthToken(token);
    return jwtDecode(token);
  },
  login: async (email: string, password: string) => {
    const { token } = await api.post('/user/login', { email, password });
    setAuthToken(token);
    return jwtDecode(token);
  },
  check: async () => {
    if (!getHasAuthToken()) {
      return null;
    }

    try {
      const { token } = await api.get('/user/auth');

      setAuthToken(token);
      return jwtDecode(token);
    } catch (error) {
      setAuthToken(null);
      return null;
    }
  },
};
