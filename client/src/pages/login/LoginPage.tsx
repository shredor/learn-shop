import { Label } from '@radix-ui/react-label';
import { useAction, useAtom } from '@reatom/npm-react';
import { useId, useState } from 'react';
import { Link } from 'wouter';

import { isAuthAtom, loginAction } from '@/entities/user/model/user.model';

import { routes } from '@/shared/config/routes';
import { Button } from '@/shared/ui/shadcn/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/shared/ui/shadcn/card';
import { Input } from '@/shared/ui/shadcn/input';

export const LoginPage = () => {
  const login = useAction(loginAction);
  const [isAuth] = useAtom(isAuthAtom);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const id = useId();
  const emailId = `${id}-email`;
  const passwordId = `${id}-password`;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrorMessage('');

    try {
      await login(email, password);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
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
                  autoFocus
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id={emailId}
                  placeholder="Enter your email"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor={passwordId}>Password</Label>
                <Input
                  type="password"
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
