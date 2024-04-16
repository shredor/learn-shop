import { Star } from 'lucide-react';
import { Link } from 'wouter';

import { useDeviceStore } from '@/entities/device/model/device.store';
import { Device } from '@/entities/device/model/device.types';

import { getStaticUrl } from '@/shared/config';
import { routes } from '@/shared/lib/router';
import { enableViewTransitionOnce } from '@/shared/lib/router/useBrowserViewTransitionPathname';
import { cn } from '@/shared/shadcn/utils';

type Props = {
  device: Device;
};

export const DeviceCard = ({ device }: Props) => {
  const { getBrand } = useDeviceStore();

  const brand = getBrand(device.typeId);

  return (
    <Link
      onClick={(e) => {
        e.currentTarget.style.viewTransitionName = 'device-card';
        enableViewTransitionOnce();
      }}
      to={routes.device.build({ id: device.id })}
      className="rounded-lg border border-border/40 bg-card text-card-foreground shadow-sm p-4 hover:scale-[1.01] transition-transform flex flex-col"
    >
      <img
        className="h-[150px] aspect-square object-contain mb-4"
        src={getStaticUrl(device.img)}
        alt={device.name}
      />
      <div className="flex flex-col">
        <span className="flex justify-between">
          <span className="text-muted-foreground">{brand?.name}</span>
          <span className="flex items-center">
            {device.avgRating || ''}
            <Star
              fill={device.avgRating ? 'currentColor' : 'none'}
              className={cn(
                'w-4 h-4 ml-1',
                device.avgRating ? 'text-yellow-400' : 'text-muted-foreground/40',
              )}
            />
          </span>
        </span>

        <span className="flex">
          <span>{device.name}</span>
        </span>
      </div>
    </Link>
  );
};
