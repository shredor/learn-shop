import { observer } from 'mobx-react-lite';

import { deviceApi } from '@/entities/device/api/device.api';
import { Brand } from '@/entities/device/model/device.types';

import useAsync from '@/shared/lib/useAsync';

import { FilterBar } from './FilterBar';

type Props = {
  className?: string;
};

const empty: never[] = [];

export const BrandsBar = observer(({ className }: Props) => {
  const { value: brands } = useAsync<Brand[]>(deviceApi.getBrands);

  return (
    <FilterBar
      title="Brand"
      className={className}
      items={brands || empty}
      historyStateProperty="brandId"
    />
  );
});
