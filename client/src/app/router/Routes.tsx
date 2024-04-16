import { observer } from 'mobx-react-lite';
import { Redirect, Route, Switch } from 'wouter';

import { AdminPage } from '@/pages/admin/AdminPage';
import { CartPage } from '@/pages/cart/CartPage';
import { DevicePage } from '@/pages/device/DevicePage';
import { LoginPage } from '@/pages/login/LoginPage';
import { RegistrationPage } from '@/pages/registration/RegistrationPage';
import { ShopPage } from '@/pages/shop/ShopPage';

import { useIsAuth } from '@/entities/user/model/user.store';

import { routes } from '@/shared/lib/router';

export const Routes = observer(function Routes() {
  const isAuth = useIsAuth();

  return (
    <Switch>
      <Route path={routes.shop.pattern} component={ShopPage} />
      <Route path={routes.device.pattern} component={DevicePage} />
      {!isAuth ? (
        <>
          <Route path={routes.login.pattern} component={LoginPage} />
          <Route path={routes.registration.pattern} component={RegistrationPage} />
        </>
      ) : (
        <>
          <Route path={routes.admin.pattern} component={AdminPage} />
          <Route path={routes.cart.pattern} component={CartPage} />
        </>
      )}

      <Redirect to={routes.shop.build()} />
    </Switch>
  );
});
