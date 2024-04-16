import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { DeviceCard } from '@/pages/shop/components/DeviceCard';

import { deviceApi } from '@/entities/device/api/device.api';
import { Device } from '@/entities/device/model/device.types';

import { useHistoryState } from '@/shared/lib/router/useBrowserViewTransitionPathname';
import useAsync from '@/shared/lib/useAsync';

export const DeviceList = observer(() => {
  const { typeId, brandId } = useHistoryState() || {};

  const { value: devices, execute: fetchDevices } = useAsync<Device[]>(
    () => deviceApi.getDevices({ brandId, typeId }).then((res) => res.rows),
    false,
  );

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices, brandId, typeId]);

  if (!devices) return null;

  return (
    <div className="grid grid-cols-3 gap-3 lg:grid-cols-4 xl:grid-cols-5">
      {devices.map((device) => (
        <DeviceCard key={device.id} device={device} />
      ))}
    </div>
  );
});
