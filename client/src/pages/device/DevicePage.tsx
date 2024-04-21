import { useAction, useAtom } from '@reatom/npm-react';
import { Star } from 'lucide-react';
import { navigate } from 'wouter/use-browser-location';

import {
  addToCartAction,
  cartResource,
  removeFromCartAction,
} from '@/entities/cart/model/cart.model';
import {
  addRatingAction,
  deviceResource,
  useBrandName,
} from '@/entities/device/model/device.model';
import { isAuthAtom } from '@/entities/user/model/user.model';

import { routes } from '@/shared/config/routes';
import { cn } from '@/shared/lib/shadcn/utils';
import { Button } from '@/shared/ui/shadcn/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/shadcn/popover';

export const DevicePage = () => {
  const isAuth = useAtom(isAuthAtom)[0];
  const device = useAtom((ctx) => ctx.spy(deviceResource.dataAtom))[0];
  const brandName = useBrandName(device?.brandId);
  const isInCart = useAtom(
    (ctx) => {
      const cartDevices = ctx.spy(cartResource.dataAtom);
      return !!cartDevices.find((cartDevice) => cartDevice.deviceId === device?.id);
    },
    [device?.id],
  )[0];

  const addToCart = useAction(addToCartAction);
  const removeFromCart = useAction(removeFromCartAction);
  const addRating = useAction(addRatingAction);

  if (!device) return null;

  const handleAddRating = (rate: number) => {
    if (!device.id) return;
    addRating({ deviceId: device.id, rate });
  };

  const handleAddToCart = () => {
    if (!device.id) return;
    if (!isAuth) return navigate(routes.login.build());
    addToCart(device.id);
  };

  const handleRemoveFromCart = () => {
    if (!device.id) return;
    if (!isAuth) return navigate(routes.login.build());
    removeFromCart({ deviceId: device.id });
  };

  return (
    <div className="container py-4">
      <div className="flex items-start mx-auto">
        <div
          style={{ viewTransitionName: 'device-card' }}
          className="rounded-xl border border-border/40 max-w-[50%] mr-8 grow p-4"
        >
          <img
            className="w-full h-[75vh] object-contain"
            src={`http://localhost:3000/static/${device.img}`}
            alt={device.name}
          />
        </div>
        <div className="max-w-16 min-w-4 grow" />
        <div className="pt-4">
          <h1 className="text-3xl font-bold mb-6">
            {brandName} {device.name}
          </h1>
          <div className="flex items-center text-lg mb-6">
            <Star
              fill={device.avgRating ? 'currentColor' : 'none'}
              className={cn(
                'w-6 h-6 mr-2',
                device.avgRating ? 'text-yellow-400' : 'text-muted-foreground/40',
              )}
            />
            <span>{device.avgRating || 'No ratings yet'}</span>
          </div>
          <div className="text-2xl mb-6">{device.price} €</div>
          <div className="flex gap-4">
            {isInCart ? (
              <Button
                key="Remove"
                onClick={handleRemoveFromCart}
                variant="secondary"
                size="lg"
                className="uppercase"
              >
                Remove from cart
              </Button>
            ) : (
              <Button key="Add" onClick={handleAddToCart} size="lg" className="uppercase">
                Add to cart
              </Button>
            )}
            {!device.hasUserRated && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button size="icon" className="w-11 h-11 text-gray-200 hover:text-yellow-300">
                    <Star fill="currentColor" className="w-6 h-6  m-auto " />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="grid gap-4 grid-flow-col">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <Button
                        onClick={() => handleAddRating(rating)}
                        variant="outline"
                        className="p-2"
                        key={rating}
                      >
                        {rating}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
      <table className=" container table-auto mx-auto mt-8">
        <tbody>
          {device.info?.map((info) => (
            <tr className="group odd:bg-primary/5 text-lg" key={info.id}>
              <td className="group-odd:rounded-l-lg w-[min(400px,40vw)] px-4 py-2">{info.title}</td>
              <td className="group-odd:rounded-r-lg w-[60vw] px-4 py-2">{info.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
