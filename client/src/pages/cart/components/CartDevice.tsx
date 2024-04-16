import { Trash2 } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'wouter';

import { cartApi } from '@/entities/cart/api/cart.api';
import { useCartStore } from '@/entities/cart/model/cart.store';
import { useDeviceStore } from '@/entities/device/model/device.store';
import { Device } from '@/entities/device/model/device.types';

import { getStaticUrl } from '@/shared/config';
import { routes } from '@/shared/lib/router';
import { Button } from '@/shared/ui/shadcn/button';

type Props = {
  cartDevieId: number;
  device: Device;
};

export const CartDevice = observer(({ device, cartDevieId }: Props) => {
  const { removeCartDevice } = useCartStore();
  const { getBrand } = useDeviceStore();

  const removeFromCart = () => {
    cartApi
      .removeDeviceFromCart({ cartDeviceId: cartDevieId })
      .then(() => removeCartDevice(cartDevieId));
  };

  return (
    <div className="flex items-start">
      <img
        src={getStaticUrl(device.img)}
        alt={device.name}
        className="w-24 mr-4 aspect-square object-contain"
      />

      <Link
        to={routes.device.build({ id: device.id })}
        className="grow text-lg font-semibold hover:underline"
      >
        {getBrand(device.brandId)?.name} {device.name}
      </Link>

      <div className="flex items-center text-secondary-foreground">
        <span className="mr-3">{device.price} €</span>
        <Button onClick={removeFromCart} className="w-8 h-8" size="icon" variant="secondary">
          <Trash2 className="w-5 h-5 opacity-70" />
        </Button>
      </div>
    </div>
  );
});
