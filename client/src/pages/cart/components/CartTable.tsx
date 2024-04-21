import { useAtom } from '@reatom/npm-react';
import { ShoppingBag } from 'lucide-react';
import { observer } from 'mobx-react-lite';

import { cartResource, cartTotalAtom, isInitialCartAtom } from '@/entities/cart/model/cart.model';

import { Button } from '@/shared/ui/shadcn/button';

import { CartDevice } from './CartDevice';

export const CartTable = observer(() => {
  const cartDevices = useAtom(cartResource.dataAtom)[0];
  const isInitial = useAtom(isInitialCartAtom)[0];
  const total = useAtom(cartTotalAtom)[0];

  if (isInitial) return null;

  if (!cartDevices.length) {
    return (
      <div className="p-12 flex flex-col items-center">
        <ShoppingBag className="text-secondary-foreground w-24 h-24 mb-8" />
        <span className="text-base">Cart is empty</span>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {cartDevices.map((cartDevice) => (
        <CartDevice cartDeviceId={cartDevice.id} key={cartDevice.id} device={cartDevice.device} />
      ))}
      <div className="flex gap-2 text-lg font-bold flex-col items-end">
        Total: {total} €
        <Button asChild size="lg" className="text-lg font-semibold">
          <a href="tel:99999999">Checkout</a>
        </Button>
      </div>
    </div>
  );
});
