import { STATIC_URL } from '@/shared/config/env';

export const getStaticUrl = (path: string) => `${STATIC_URL}/${path}`;
