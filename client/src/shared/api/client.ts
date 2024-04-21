import { API_URL } from '@/shared/config/env';
import { createApi } from '@/shared/lib/fetch/fetch';

export const api = createApi({ baseUrl: API_URL });
