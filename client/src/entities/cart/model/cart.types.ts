import { Device } from '@/entities/device/model/device.types';

export type CartDevice = {
  id: number;
  basketId: number;
  deviceId: number;
  createdAt: Date;
  updatedAt: Date;
  device: Device;
};
