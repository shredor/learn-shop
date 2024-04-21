import { action, atom, reatomResource, withDataAtom, withStatusesAtom } from '@reatom/framework';
import { jwtDecode } from 'jwt-decode';

import { setSessionToken } from '@/shared/api';

import { userApi } from './user.api';
import { User } from './user.types';

const userDataResource = reatomResource(async (ctx) => {
  const { token } = await ctx.schedule(() => userApi.check(ctx.controller.signal));
  return { token, user: token ? jwtDecode<User>(token) : null };
}, 'userDataResource').pipe(withDataAtom({ token: '', user: null }), withStatusesAtom());

userDataResource.dataAtom.onChange((_ctx, { token }) => setSessionToken(token));

export const userAtom = atom((ctx) => ctx.spy(userDataResource.dataAtom).user, 'userAtom');

export const isAuthAtom = atom((ctx) => !!ctx.spy(userAtom), 'isAuthAtom');

export const isUserEverSettledAtom = atom((ctx, prevIsEverSettled?: boolean) => {
  if (prevIsEverSettled) return true;

  const statuses = ctx.spy(userDataResource.statusesAtom);
  return statuses.isRejected || statuses.isFulfilled;
}, 'isUserEverSettledAtom');

export const loginAction = action(async (ctx, email: string, password: string) => {
  const { token, user } = await ctx.schedule(() => userApi.login({ email, password }));
  userDataResource.dataAtom(ctx, { user, token });
}, 'loginAction');

export const logoutAction = action(
  async (ctx) => userDataResource.dataAtom(ctx, { user: null, token: '' }),
  'logoutAction',
);

export const registerAction = action(async (ctx, email: string, password: string) => {
  const { user, token } = await ctx.schedule(() => userApi.registration({ email, password }));
  userDataResource.dataAtom(ctx, { user, token });
}, 'registerAction');
