import {
  atom,
  reatomAsync,
  reatomResource,
  withCache,
  withDataAtom,
  withReset,
} from '@reatom/framework';
import { useAtom } from '@reatom/npm-react';

import { isAuthAtom } from '@/entities/user/model/user.model';

import { routes } from '@/shared/config/routes';
import { createResetAtom } from '@/shared/lib/reatom/resetAtom';
import { historyStateAtom, pathnameAtom } from '@/shared/lib/router/hooks';

import { deviceApi } from './device.api';

const brandsResourceResetAtom = createResetAtom('brandsResourceResetAtom');
export const brandsResource = reatomResource(async (ctx) => {
  ctx.spy(brandsResourceResetAtom);
  return ctx.schedule(() => deviceApi.getBrands());
}, 'brandsResource').pipe(withCache({ swr: false }), withDataAtom([]));

export const useBrandName = (brandId: number | undefined) =>
  useAtom(
    (ctx) => ctx.spy(brandsResource.dataAtom).find((brand) => brand.id === brandId)?.name || '',
    [brandId],
  )[0];

const typesResourceResetAtom = createResetAtom('typesResourceResetAtom');
export const typesResource = reatomResource(async (ctx) => {
  ctx.spy(typesResourceResetAtom);
  return ctx.schedule(() => deviceApi.getTypes());
}, 'typesResource').pipe(withCache({ swr: false }), withDataAtom([]), withReset());

const brandIdAtom = atom((ctx) => ctx.spy(historyStateAtom)?.brandId, 'brandIdAtom');
const typeIdAtom = atom((ctx) => ctx.spy(historyStateAtom)?.typeId, 'typeIdAtom');

const devicesResourceResetAtom = createResetAtom('devicesResourceResetAtom');
export const devicesResource = reatomResource(async (ctx) => {
  ctx.spy(devicesResourceResetAtom);
  const brandId = ctx.spy(brandIdAtom);
  const typeId = ctx.spy(typeIdAtom);

  const { rows } = await ctx.schedule(() => deviceApi.getDevices({ brandId, typeId }));

  return rows;
}, 'devicesResource').pipe(withCache({ swr: false }), withDataAtom([]));

export const brandsAtom = brandsResource.dataAtom;
export const typesAtom = typesResource.dataAtom;
export const devicesAtom = devicesResource.dataAtom;

const deviceResourceResetAtom = createResetAtom('devicesResourceResetAtom');
export const deviceResource = reatomResource((ctx) => {
  ctx.spy(deviceResourceResetAtom);
  const path = ctx.spy(pathnameAtom);
  const deviceId = routes.device.parse(path)?.id;
  ctx.spy(isAuthAtom);

  return ctx.schedule(() => (deviceId ? deviceApi.getDevice(deviceId) : null));
}, 'deviceResource').pipe(withCache({ swr: false }), withDataAtom());

export const addTypeAction = reatomAsync((_ctx, name: string) => deviceApi.createType(name), {
  name: 'addTypeAction',
  onFulfill(ctx) {
    typesResourceResetAtom.reset(ctx);
  },
});

export const addBrandAction = reatomAsync((_ctx, name: string) => deviceApi.createBrand(name), {
  name: 'addBrandAction',
  onFulfill(ctx) {
    brandsResourceResetAtom.reset(ctx);
  },
});

export const addDeviceAction = reatomAsync(
  (
    _ctx,
    params: {
      name: string;
      price: number;
      brandId: number;
      typeId: number;
      info: { title: string; description: string }[];
      img: File;
    },
  ) => deviceApi.createDevice(params),
  {
    name: 'addDeviceAction',
    onFulfill(ctx) {
      devicesResourceResetAtom.reset(ctx);
    },
  },
);

export const addRatingAction = reatomAsync(
  (_ctx, params: { deviceId: number; rate: number }) =>
    deviceApi.addRating(params.deviceId, params.rate),
  {
    name: 'addRatingAction',
    onFulfill(ctx) {
      deviceResourceResetAtom.reset(ctx);
      // devicesResourceResetAtom.reset(ctx);

      devicesResource.cacheAtom.invalidate(ctx);
    },
  },
);
