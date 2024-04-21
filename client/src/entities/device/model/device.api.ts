import { sessionApi } from '@/shared/api';
import { api } from '@/shared/api/client';

import { Brand, Device, DeviceType } from './device.types';

export const deviceApi = {
  createType: async (name: string) => {
    const data = await sessionApi.post('/type', { name });
    return data;
  },
  getTypes: async () => {
    const data = await api.get<DeviceType[]>('/type');
    return data;
  },
  createBrand: async (name: string) => {
    const data = await sessionApi.post('/brand', { name });
    return data;
  },
  getBrands: async () => {
    const data = await api.get<Brand[]>('/brand');
    return data;
  },
  createDevice: async ({
    name,
    price,
    brandId,
    typeId,
    info,
    img,
  }: {
    name: string;
    price: number;
    brandId: number;
    typeId: number;
    info: { title: string; description: string }[];
    img: File;
  }) => {
    const data = await sessionApi.post('/device', { name, price, brandId, typeId, info, img });
    return data;
  },
  getDevices: async ({ brandId, typeId }: { brandId?: number; typeId?: number }) => {
    const data = await api.get<{
      rows: Device[];
      count: number;
    }>('/device', {
      params: { brandId, typeId },
    });
    return data;
  },

  getDevice: async (id: string) => {
    const data = await sessionApi.get<Device>(`/device/${id}`);
    return data;
  },

  addRating: async (deviceId: number, rate: number) => {
    const data = await sessionApi.post(`/rating`, { rate, deviceId });
    return data;
  },
};
