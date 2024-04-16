import { ShoppingBag } from 'lucide-react';
import { observer } from 'mobx-react-lite';

import { useCartStore } from '@/entities/cart/model/cart.store';

import { CartDevice } from './CartDevice';

export const CartTable = observer(() => {
  const { cartDevices } = useCartStore();

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
        <CartDevice cartDevieId={cartDevice.id} key={cartDevice.id} device={cartDevice.device} />
      ))}
    </div>
  );
});
