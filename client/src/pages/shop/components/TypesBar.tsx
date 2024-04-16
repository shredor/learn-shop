import { observer } from 'mobx-react-lite';

import { deviceApi } from '@/entities/device/api/device.api';
import { DeviceType } from '@/entities/device/model/device.types';

import { usePathname } from '@/shared/lib/router/useBrowserViewTransitionPathname';
import useAsync from '@/shared/lib/useAsync';

import { FilterBar } from './FilterBar';

type Props = {
  className?: string;
};

const empty: never[] = [];

export const TypesBar = observer(({ className }: Props) => {
  const { value: types } = useAsync<DeviceType[]>(deviceApi.getTypes);
  usePathname();

  console.log('render');

  return (
    <FilterBar
      title="Type"
      className={className}
      items={types || empty}
      historyStateProperty="brandId"
    />
  );
});
