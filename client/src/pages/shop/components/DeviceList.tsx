import { useAtom } from '@reatom/npm-react';

import { DeviceCard } from '@/pages/shop/components/DeviceCard';

import { devicesResource } from '@/entities/device/model/device.model';

export const DeviceList = () => {
  const devices = useAtom(devicesResource.dataAtom)[0];

  if (!devices) return null;

  return (
    <div className="grid grid-cols-3 gap-3 lg:grid-cols-4 xl:grid-cols-5">
      {devices.map((device) => (
        <DeviceCard key={device.id} device={device} />
      ))}
    </div>
  );
};
