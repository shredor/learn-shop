import { CartDevice } from '@/entities/cart/model/cart.types';

import { sessionApi } from '@/shared/api';

export const cartApi = {
  getCartDevices: async () => {
    const data = await sessionApi.get<CartDevice[]>('/cart-device');
    return data;
  },

  addDeviceToCart: async (deviceId: number) => {
    const data = await sessionApi.post('/cart-device', { deviceId });
    return data;
  },

  removeDeviceFromCart: async ({
    deviceId,
    cartDeviceId,
  }: {
    deviceId?: number;
    cartDeviceId?: number;
  }) => {
    const data = cartDeviceId
      ? await sessionApi.delete(`/cart-device/${cartDeviceId}`)
      : await sessionApi.delete(`/cart-device`, { deviceId });
    return data;
  },
};
