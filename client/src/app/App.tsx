import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import { Routes } from '@/app/router/Routes';

import { Navbar } from '@/widgets/navbar/ui/Navbar';

import { userApi } from '@/entities/user/api/user.api';
import { useUserStore } from '@/entities/user/model/user.store';
import { User } from '@/entities/user/model/user.types';

import { Loader } from '@/shared/ui/loader';

export const App = observer(() => {
  const { setUser } = useUserStore();
  const [isUserLoader, setIsUserLoaded] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const user = await userApi.check();
        setUser(user as User);
      } catch {
        // no user
      }

      setIsUserLoaded(true);
    };

    loadUser();
  }, [setUser]);

  if (!isUserLoader) {
    return (
      <div className="fixed inset-0 flex justify-center items-center pb-20  animate-[fade-in_250ms_1s_both]">
        <Loader className="w-12 h-12" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Routes />
    </div>
  );
});
