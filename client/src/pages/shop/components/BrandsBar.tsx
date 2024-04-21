import { useAtom } from '@reatom/npm-react';
import { observer } from 'mobx-react-lite';

import { brandsResource } from '@/entities/device/model/device.model';

import { FilterBar } from './FilterBar';

type Props = {
  className?: string;
};

export const BrandsBar = observer(({ className }: Props) => {
  const brands = useAtom(brandsResource.dataAtom)[0];

  return (
    <FilterBar title="Brand" className={className} items={brands} historyStateProperty="brandId" />
  );
});
