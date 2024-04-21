import { useState } from 'react';

import { Button } from '@/shared/ui/shadcn/button';
import { Dialog, DialogTrigger } from '@/shared/ui/shadcn/dialog';

import { AddBrandModal } from './components/AddBrandModal';
import { AddDeviceModal } from './components/AddDeviceModal';
import { AddTypeModal } from './components/AddTypeModal';

// import { AddBrandModal } from './components/AddBrandModal';
// import { AddDeviceModal } from './components/AddDeviceModal';
// import { AddTypeModal } from './components/AddTypeModal';

export const AdminPage = () => {
  const [isTypeModalOpen, setIsTypeModalOpen] = useState(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);

  const closeTypeModal = () => setIsTypeModalOpen(false);
  const closeBrandModal = () => setIsBrandModalOpen(false);
  const closeDeviceModal = () => setIsDeviceModalOpen(false);

  return (
    <div className="container py-16 flex gap-8 justify-center">
      <Dialog open={isTypeModalOpen} onOpenChange={setIsTypeModalOpen}>
        <DialogTrigger asChild>
          <Button className="p-8 text-xl rounded-xl">Add type</Button>
        </DialogTrigger>
        <AddTypeModal close={closeTypeModal} />
      </Dialog>

      <Dialog open={isBrandModalOpen} onOpenChange={setIsBrandModalOpen}>
        <DialogTrigger asChild>
          <Button className="p-8 text-xl rounded-xl">Add brand</Button>
        </DialogTrigger>
        <AddBrandModal close={closeBrandModal} />
      </Dialog>

      <Dialog open={isDeviceModalOpen} onOpenChange={setIsDeviceModalOpen}>
        <DialogTrigger asChild>
          <Button className="p-8 text-xl rounded-xl">Add device</Button>
        </DialogTrigger>
        <AddDeviceModal close={closeDeviceModal} />
      </Dialog>
    </div>
  );
};
