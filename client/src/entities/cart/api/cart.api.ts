import { api } from '@/shared/lib/fetch';

export const cartApi = {
  getCartDevices: async () => {
    const data = await api.get('/basket-device');
    return data;
  },

  addDeviceToCart: async (deviceId: number) => {
    const data = await api.post('/basket-device', { deviceId });
    return data;
  },

  removeDeviceFromCart: async ({
    deviceId,
    basketDeviceId,
  }: {
    deviceId?: number;
    basketDeviceId?: number;
  }) => {
    const data = basketDeviceId
      ? await api.delete(`/basket-device/${basketDeviceId}`)
      : await api.delete(`/basket-device`, { deviceId });
    return data;
  },
};
