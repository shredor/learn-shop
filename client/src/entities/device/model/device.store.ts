import { makeAutoObservable } from 'mobx';

import { Brand, Device, DeviceType } from '@/entities/device/model/device.types';

import { useStore } from '@/shared/lib/store';

export class DeviceStore {
  private _typesMap: Record<number, DeviceType> = {};
  private _brandsMap: Record<number, Brand> = {};
  private _devices: Device[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get types() {
    return Object.values(this._typesMap);
  }

  get brands() {
    return Object.values(this._brandsMap);
  }

  getType = (id: number): DeviceType | undefined => {
    return this._typesMap[id];
  };

  getBrand = (id: number): Brand | undefined => {
    return this._brandsMap[id];
  };

  get devices() {
    return this._devices;
  }

  setTypes = (types: DeviceType[]) => {
    this._typesMap = types.reduce((acc: Record<number, DeviceType>, type: DeviceType) => {
      acc[type.id] = type;
      return acc;
    }, {});
  };

  setBrands = (brands: Brand[]) => {
    this._brandsMap = brands.reduce((acc: Record<number, Brand>, brand: Brand) => {
      acc[brand.id] = brand;
      return acc;
    }, {});
  };

  setDevices = (devices: Device[]) => {
    this._devices = devices;
  };
}

export const useDeviceStore = () => useStore().devices;
