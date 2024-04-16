import { makeAutoObservable } from 'mobx';

import { CartDevice } from '@/entities/cart/model/cart.types';

import { useStore } from '@/shared/lib/store';

export class CartStore {
  private _cartDevices: CartDevice[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get cartDevices() {
    return this._cartDevices;
  }

  setCartDevices = (cartDevices: CartDevice[]) => {
    this._cartDevices = cartDevices;
  };

  removeCartDevice = (cartDeviceId: number) => {
    this._cartDevices = this._cartDevices.filter((device) => device.id !== cartDeviceId);
  };
}

export const useCartStore = () => useStore().cart;
