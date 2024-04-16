import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  Default,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { sequelize } from './db';

@Table({ tableName: 'users' })
class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Unique
  @Column
  email!: string;

  @Column
  password!: string;

  @Default('USER')
  @Column
  role!: string;

  @HasOne(() => Cart)
  cart!: Cart;

  @HasMany(() => Rating)
  ratings!: Rating[];
}

@Table({ tableName: 'carts' })
class Cart extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => CartDevice)
  cartDevices!: CartDevice[];
}

@Table({ tableName: 'cart_devices' })
class CartDevice extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => Cart)
  @Column
  cartId!: number;

  @ForeignKey(() => Device)
  @Column
  deviceId!: number;

  @BelongsTo(() => Cart)
  cart!: Cart;

  @BelongsTo(() => Device)
  device!: Device;
}

@Table({ tableName: 'devices' })
class Device extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Unique
  @AllowNull(false)
  @Column
  name!: string;

  @AllowNull(false)
  @Column
  price!: number;

  @AllowNull(false)
  @Column
  img!: string;

  @ForeignKey(() => Type)
  @Column
  typeId!: number;

  @ForeignKey(() => Brand)
  @Column
  brandId!: number;

  @BelongsTo(() => Type)
  type!: Type;

  @BelongsTo(() => Brand)
  brand!: Brand;

  @HasMany(() => Rating)
  ratings!: Rating[];

  @HasMany(() => CartDevice)
  cartDevices!: CartDevice[];

  @HasMany(() => DeviceInfo)
  info!: DeviceInfo[];
}

@Table({ tableName: 'types' })
class Type extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Unique
  @AllowNull(false)
  @Column
  name!: string;

  @HasMany(() => Device)
  devices!: Device[];

  @BelongsToMany(() => Brand, () => TypeBrand)
  brands!: Brand[];
}

@Table({ tableName: 'brands' })
class Brand extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @Unique
  @AllowNull(false)
  @Column
  name!: string;

  @HasMany(() => Device)
  devices!: Device[];

  @BelongsToMany(() => Type, () => TypeBrand)
  types!: Type[];
}

@Table({ tableName: 'ratings' })
class Rating extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @AllowNull(false)
  @Column
  rate!: number;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @ForeignKey(() => Device)
  @Column
  deviceId!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => Device)
  device!: Device;
}

@Table({ tableName: 'device_infos' })
class DeviceInfo extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @AllowNull(false)
  @Column
  title!: string;

  @AllowNull(false)
  @Column
  description!: string;

  @ForeignKey(() => Device)
  @Column
  deviceId!: number;

  @BelongsTo(() => Device)
  device!: Device;
}

@Table({ tableName: 'type_brands' })
class TypeBrand extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id!: number;

  @ForeignKey(() => Type)
  @Column
  typeId!: number;

  @ForeignKey(() => Brand)
  @Column
  brandId!: number;
}

sequelize.addModels([User, Cart, CartDevice, Device, Type, Brand, Rating, DeviceInfo, TypeBrand]);

export { Cart, CartDevice, Brand, Device, DeviceInfo, Rating, Type, TypeBrand, User };
