export type DeviceType = {
  id: number;
  name: string;
};

export type Brand = {
  id: number;
  name: string;
};

export type DeviceInfo = {
  id: number;
  title: string;
  description: string;
};

export type Device = {
  id: number;
  name: string;
  price: number;
  rating: number;
  img: string;
  typeId: number;
  brandId: number;
  avgRating: number;
  info: DeviceInfo[];
};

export type DeviceWithCartInfo = Device & {
  isInBasket: boolean;
};
