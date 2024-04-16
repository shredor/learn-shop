import { CartStore } from '@/entities/cart/model/cart.store';
import { DeviceStore } from '@/entities/device/model/device.store';
import { UserStore } from '@/entities/user/model/user.store';

export const createStore = () => ({
  user: new UserStore(),
  devices: new DeviceStore(),
  cart: new CartStore(),
});

export type RootStore = ReturnType<typeof createStore>;
