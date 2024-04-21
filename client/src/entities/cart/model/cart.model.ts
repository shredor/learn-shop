import {
  atom,
  reatomAsync,
  reatomResource,
  withDataAtom,
  withRetry,
  withStatusesAtom,
} from '@reatom/framework';

import { cartApi } from '@/entities/cart/model/cart.api';
import { isAuthAtom } from '@/entities/user/model/user.model';

const initialCart: never[] = [];

export const cartResource = reatomResource((ctx) => {
  ctx.spy(isAuthAtom);
  return ctx.schedule(() => cartApi.getCartDevices());
}, 'cartResource').pipe(withRetry(), withDataAtom(initialCart), withStatusesAtom());

export const cartTotalAtom = atom((ctx) => {
  const devices = ctx.spy(cartResource.dataAtom);
  return devices.reduce((acc, device) => acc + device.device.price, 0);
}, 'cartTotalAtom');

export const isInitialCartAtom = atom(
  (ctx) => ctx.spy(cartResource.dataAtom) === initialCart,
  'isInitialCartAtom',
);

export const addToCartAction = reatomAsync(
  (_ctx, deviceId: number) => cartApi.addDeviceToCart(deviceId),
  {
    name: 'addToCartAction',
    onFulfill(ctx) {
      cartResource.retry(ctx);
    },
  },
);

export const removeFromCartAction = reatomAsync(
  (
    _ctx,
    params: {
      deviceId?: number;
      cartDeviceId?: number;
    },
  ) => cartApi.removeDeviceFromCart(params),
  {
    name: 'removeFromCartAction',
    onFulfill(ctx) {
      cartResource.retry(ctx);
    },
  },
);
