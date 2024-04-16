import { ShoppingCart, User, Zap } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'wouter';

import { useIsAuth, useUserStore } from '@/entities/user/model/user.store';

import { setAuthToken } from '@/shared/lib/fetch';
import { routes } from '@/shared/lib/router';
import { cn } from '@/shared/lib/shadcn/utils';

export const Navbar = observer(() => {
  const { setUser } = useUserStore();
  const isAuth = useIsAuth();

  const logOut = () => {
    setUser(null);
    setAuthToken(null);
  };

  const links = isAuth
    ? [
        { name: 'Admin', to: routes.admin.build() },
        { name: 'Cart', to: routes.cart.build(), icon: ShoppingCart },
        { name: 'Logout', onClick: logOut },
      ]
    : [
        {
          icon: User,
          name: 'Login',
          to: routes.login.build(),
        },
      ];

  return (
    <header className="px-4 sticky top-0 bg-background/90 backdrop-blur z-50 shadow-sm dark:border-b dark:border-border/20 flex items-stretch justify-between h-16">
      <Link
        to={routes.shop.build()}
        className="text-primary dark:text-foreground text-2xl flex items-center font-bold hover:brightness-150 hover:contrast-150 dark:hover:text-primary dark:hover:contrast-100 transition-colors"
      >
        <Zap className="w-8 h-8 mr-3" />
        MyShop
      </Link>
      <nav>
        <ul className="h-full flex items-stretch">
          {links.map((link) => {
            const Icon = link.icon;
            const linkProps = {
              key: link.name,
              onClick: link.onClick,
              className:
                'h-full px-4 font-semibold text-muted-foreground hover:text-foreground flex items-center',
              children: (
                <>
                  {Icon && <Icon className="w-5 h-5 mr-2" />}
                  {link.name}
                </>
              ),
            };

            return link.to ? (
              <Link
                {...linkProps}
                to={link.to}
                className={(isActive) =>
                  cn(
                    linkProps.className,
                    isActive
                      ? 'relative after:absolute after:block after:w-5/6 after:left-1/2 after:-translate-x-1/2 after:-translate-y-full after:h-0.5 after:bg-primary after:top-full text-foreground'
                      : 'text-muted-foreground',
                  )
                }
              />
            ) : (
              <button {...linkProps} />
            );
          })}
        </ul>
      </nav>
    </header>
  );
});
