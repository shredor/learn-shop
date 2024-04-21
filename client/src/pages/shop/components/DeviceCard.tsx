import { useCtx } from '@reatom/npm-react';
import { Star } from 'lucide-react';
import { Link } from 'wouter';

import { deviceResource, useBrandName } from '@/entities/device/model/device.model';
import { Device } from '@/entities/device/model/device.types';

import { routes } from '@/shared/config/routes';
import { useShouldUseViewTransitionOnce } from '@/shared/lib/router/hooks';
import { cn } from '@/shared/lib/shadcn/utils';
import { getStaticUrl } from '@/shared/lib/url/staticUrl';

type Props = {
  device: Device;
};

export const DeviceCard = ({ device }: Props) => {
  const ctx = useCtx();
  const enableViewTransitionOnce = useShouldUseViewTransitionOnce();
  const brandName = useBrandName(device.brandId);

  return (
    <Link
      onClick={(e) => {
        e.currentTarget.style.viewTransitionName = 'device-card';
        enableViewTransitionOnce();
        deviceResource.dataAtom(ctx, device);
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
          <span className="text-muted-foreground">{brandName}</span>
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
