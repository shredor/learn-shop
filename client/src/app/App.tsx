import { useAtom } from '@reatom/npm-react';

import { Routes } from '@/app/router/Routes';

import { Navbar } from '@/widgets/navbar/ui/Navbar';

import { isUserEverSettledAtom } from '@/entities/user/model/user.model';

import { usePathname } from '@/shared/lib/router/hooks';
import { Loader } from '@/shared/ui/loader';

export const App = () => {
  usePathname();
  const [isUserEverSettled] = useAtom(isUserEverSettledAtom);

  if (!isUserEverSettled) {
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
};
