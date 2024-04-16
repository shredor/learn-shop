import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import { cartApi } from '@/entities/cart/api/cart.api';
import { useCartStore } from '@/entities/cart/model/cart.store';
import { deviceApi } from '@/entities/device/api/device.api';
import { useDeviceStore } from '@/entities/device/model/device.store';

import { CartTable } from './components/CartTable';

export const CartPage = observer(() => {
  const { setCartDevices } = useCartStore();
  const { setTypes, setBrands } = useDeviceStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    cartApi
      .getCartDevices()
      .then((cartDevices) => setCartDevices(cartDevices))
      .finally(() => setIsLoading(false));
  }, [setCartDevices]);

  useEffect(() => {
    deviceApi.getTypes().then((data) => setTypes(data));
    deviceApi.getBrands().then((data) => setBrands(data));
  }, [setBrands, setTypes]);

  return (
    <div className="container py-4 px-4">
      <h1 className="text-2xl font-semibold mb-4">Cart Page</h1>
      {!isLoading && <CartTable />}
    </div>
  );
});
