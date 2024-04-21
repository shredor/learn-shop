import { useAtom } from '@reatom/npm-react';
import { observer } from 'mobx-react-lite';

import { typesResource } from '@/entities/device/model/device.model';

import { FilterBar } from './FilterBar';

type Props = {
  className?: string;
};

export const TypesBar = observer(({ className }: Props) => {
  const types = useAtom(typesResource.dataAtom)[0];

  return (
    <FilterBar title="Type" className={className} items={types} historyStateProperty="typeId" />
  );
});
