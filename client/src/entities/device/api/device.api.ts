import { api } from '@/shared/lib/fetch';

export const deviceApi = {
  createType: async (name: string) => {
    const data = await api.post('/type', { name });
    return data;
  },
  getTypes: async () => {
    const data = await api.get('/type');
    return data;
  },
  createBrand: async (name: string) => {
    const data = await api.post('/brand', { name });
    return data;
  },
  getBrands: async () => {
    const data = await api.get('/brand');
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
    const data = await api.post('/device', { name, price, brandId, typeId, info, img });
    return data;
  },
  getDevices: async ({ brandId, typeId }: { brandId?: number; typeId?: number }) => {
    const data = await api.get('/device', { brandId, typeId });
    return data;
  },

  getDevice: async (id: string) => {
    const data = await api.get(`/device/${id}`);
    return data;
  },
};
