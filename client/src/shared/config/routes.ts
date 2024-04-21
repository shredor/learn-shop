import { buildRoutes } from '@/shared/lib/router/buildRoutes';

export const routes = buildRoutes({
  admin: '/admin',
  login: '/login',
  registration: '/registration',
  cart: '/cart',
  device: '/device/:id',
  shop: '/',
} as const);
