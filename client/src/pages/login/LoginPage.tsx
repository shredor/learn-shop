import { Label } from '@radix-ui/react-label';
import { useId, useState } from 'react';
import { Link, Redirect } from 'wouter';

import { userApi } from '@/entities/user/api/user.api';
import { useIsAuth, useUserStore } from '@/entities/user/model/user.store';
import { User } from '@/entities/user/model/user.types';

import { routes } from '@/shared/lib/router';
import { Button } from '@/shared/ui/shadcn/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/shadcn/card';
import { Input } from '@/shared/ui/shadcn/input';

export const LoginPage = () => {
  const { setUser } = useUserStore();
  const id = useId();
  const isAuth = useIsAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const emailId = `${id}-email`;
  const passwordId = `${id}-password`;

  if (isAuth) {
    return <Redirect to={routes.shop.build()} />;
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    userApi
      .login(email, password)
      .then((user) => {
        setUser(user as User);
      })
      .catch((e) => {
        setErrorMessage(e.message);
      });
  };

  return (
    <div className="flex-grow flex justify-center items-center py-5 h-full">
      <form className="mx-auto w-10/12 max-w-lg" onSubmit={onSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              {errorMessage && <div className="text-red-500">{errorMessage}</div>}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor={emailId}>Email</Label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id={emailId}
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor={passwordId}>Password</Label>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id={passwordId}
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between gap-3">
            <span>
              Don&apos;t have an account?{' '}
              <Link
                className="text-muted-foreground hover:text-foreground hover:underline"
                to={routes.registration.build()}
              >
                Register
              </Link>
            </span>
            <Button>Login</Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
