import { observer } from 'mobx-react-lite';

import { BrandsBar } from '@/pages/shop/components/BrandsBar';
import { DeviceList } from '@/pages/shop/components/DeviceList';
import { TypesBar } from '@/pages/shop/components/TypesBar';

export const ShopPage = observer(() => {
  return (
    <div className="flex container py-4 px-4">
      <div className="w-44 mr-4 shrink-0">
        <TypesBar />
        <hr className="my-2" />
        <BrandsBar className="mb-3" />
      </div>
      <div className="flex-grow">
        <DeviceList />
      </div>
    </div>
  );
});
