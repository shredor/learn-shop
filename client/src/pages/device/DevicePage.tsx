import { Star } from 'lucide-react';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';

import { cartApi } from '@/entities/cart/api/cart.api';
import { deviceApi } from '@/entities/device/api/device.api';
import { useDeviceStore } from '@/entities/device/model/device.store';
import { DeviceWithCartInfo } from '@/entities/device/model/device.types';
import { useIsAuth } from '@/entities/user/model/user.store';

import { routes } from '@/shared/lib/router';
import { Button } from '@/shared/shadcn/ui/button';
import { cn } from '@/shared/shadcn/utils';

export const DevicePage = observer(() => {
  const { getBrand } = useDeviceStore();

  const [device, setDevice] = useState<
    DeviceWithCartInfo | ({ info: [] } & Partial<DeviceWithCartInfo>)
  >({
    info: [],
  });

  const [, params] = routes.device.useRoute();
  const isAuth = useIsAuth();
  const [, navigate] = useLocation();
  const deviceId = params?.id || '';

  useEffect(() => {
    deviceApi.getDevice(deviceId).then((device) => setDevice(observable(device)));
  }, [deviceId]);

  const addToCart = () => {
    if (!device.id) return;

    if (!isAuth) return navigate(routes.registration.build());

    cartApi.addDeviceToCart(device.id).then(() => {
      device.isInBasket = true;
    });
  };

  const removeFromCart = () => {
    if (!device.id) return;

    cartApi.removeDeviceFromCart({ deviceId: device.id }).then(() => {
      device.isInBasket = false;
    });
  };

  const brand = device.typeId !== undefined ? getBrand(device.typeId) : undefined;

  return (
    <div className="container py-4">
      <div className="flex items-start mx-auto">
        <div
          style={{ viewTransitionName: 'device-card' }}
          className="rounded-xl border border-border/40 max-w-[50%] mr-8 grow p-4"
        >
          <img
            className="w-full h-[75vh] object-contain"
            src={`http://localhost:3000/static/${device.img}`}
            alt={device.name}
          />
        </div>
        <div className="max-w-16 min-w-4 grow" />
        <div className="pt-4">
          <h1 className="text-3xl font-bold mb-6">
            {brand?.name} {device.name}
          </h1>
          <div className="flex items-center text-lg mb-6">
            <Star
              fill={device.avgRating ? 'currentColor' : 'none'}
              className={cn(
                'w-6 h-6 mr-2',
                device.avgRating ? 'text-yellow-400' : 'text-muted-foreground/40',
              )}
            />
            <span>{device.avgRating || 'No ratings yet'}</span>
          </div>
          <div className="text-2xl mb-6">{device.price} €</div>
          {device.isInBasket ? (
            <Button
              key="Remove"
              onClick={removeFromCart}
              variant="secondary"
              size="lg"
              className="uppercase"
            >
              Remove from cart
            </Button>
          ) : (
            <Button key="Add" onClick={addToCart} size="lg" className="uppercase">
              Add to cart
            </Button>
          )}
        </div>
      </div>
      <table className=" container table-auto mx-auto mt-8">
        <tbody>
          {device.info.map((info) => (
            <tr className="group odd:bg-primary/5 text-lg" key={info.id}>
              <td className="group-odd:rounded-l-lg w-[min(400px,40vw)] px-4 py-2">{info.title}</td>
              <td className="group-odd:rounded-r-lg w-[60vw] px-4 py-2">{info.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});
