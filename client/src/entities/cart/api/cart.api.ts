import { api } from '@/shared/lib/fetch';

export const cartApi = {
  getCartDevices: async () => {
    const data = await api.get('/cart-device');
    return data;
  },

  addDeviceToCart: async (deviceId: number) => {
    const data = await api.post('/cart-device', { deviceId });
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
      ? await api.delete(`/cart-device/${cartDeviceId}`)
      : await api.delete(`/cart-device`, { deviceId });
    return data;
  },
};
