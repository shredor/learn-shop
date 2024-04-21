import { useAction } from '@reatom/npm-react';
import { Trash2 } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'wouter';

import { removeFromCartAction } from '@/entities/cart/model/cart.model';
import { useBrandName } from '@/entities/device/model/device.model';
import { Device } from '@/entities/device/model/device.types';

import { routes } from '@/shared/config/routes';
import { getStaticUrl } from '@/shared/lib/url/staticUrl';
import { Button } from '@/shared/ui/shadcn/button';

type Props = {
  cartDeviceId: number;
  device: Device;
};

export const CartDevice = observer(({ device, cartDeviceId }: Props) => {
  const brandName = useBrandName(device.brandId);
  const removeFromCart = useAction(removeFromCartAction);

  const handleRemoveFromCart = () => {
    removeFromCart({ cartDeviceId });
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
        {brandName} {device.name}
      </Link>

      <div className="flex items-center text-secondary-foreground">
        <span className="mr-3">{device.price} €</span>
        <Button onClick={handleRemoveFromCart} className="w-8 h-8" size="icon" variant="secondary">
          <Trash2 className="w-5 h-5 opacity-70" />
        </Button>
      </div>
    </div>
  );
});
