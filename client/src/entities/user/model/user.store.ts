import { makeAutoObservable } from 'mobx';

import { User } from '@/entities/user/model/user.types';

import { useStore } from '@/shared/lib/store';

export class UserStore {
  private _user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser = (user: User | null) => {
    this._user = user;
  };

  get user() {
    return this._user;
  }

  get isAuth() {
    return !!this._user;
  }
}

export const useUserStore = () => useStore().user;
export const useIsAuth = () => useStore().user.isAuth;
export const useUser = () => useStore().user.user;
