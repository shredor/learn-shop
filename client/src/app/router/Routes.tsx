import { useAtom } from '@reatom/npm-react';
import { Redirect, Route, Switch } from 'wouter';

import { AdminPage } from '@/pages/admin/AdminPage';
import { CartPage } from '@/pages/cart/CartPage';
import { DevicePage } from '@/pages/device/DevicePage';
import { LoginPage } from '@/pages/login/LoginPage';
import { RegistrationPage } from '@/pages/registration/RegistrationPage';
import { ShopPage } from '@/pages/shop/ShopPage';

import { isAuthAtom } from '@/entities/user/model/user.model';

import { routes } from '@/shared/config/routes';

export const Routes = function Routes() {
  const [isAuth] = useAtom(isAuthAtom);

  return (
    <Switch>
      <Route path={routes.shop.pattern} component={ShopPage} />
      <Route path={routes.device.pattern} component={DevicePage} />
      <Route path={routes.login.pattern}>
        {isAuth ? <Redirect to={routes.shop.build()} /> : <LoginPage />}
      </Route>
      <Route path={routes.registration.pattern}>
        {isAuth ? <Redirect to={routes.shop.build()} /> : <RegistrationPage />}
      </Route>
      <Route path={routes.admin.pattern}>
        {!isAuth ? <Redirect to={routes.login.build()} /> : <AdminPage />}
      </Route>
      <Route path={routes.cart.pattern}>
        {!isAuth ? <Redirect to={routes.login.build()} /> : <CartPage />}
      </Route>
      <Redirect to={routes.shop.build()} />
    </Switch>
  );
};
