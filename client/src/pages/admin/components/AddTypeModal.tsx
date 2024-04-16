import React, { useId, useState } from 'react';

import { deviceApi } from '@/entities/device/api/device.api';

import { Button } from '@/shared/shadcn/ui/button';
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/shadcn/ui/dialog';
import { Input } from '@/shared/shadcn/ui/input';

type AddTypeModalProps = {
  close: () => void;
};

const AddTypeForm = ({ close }: AddTypeModalProps) => {
  const id = useId();
  const [name, setName] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    deviceApi.createType(name).then(() => {
      close();
    });
  };

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <DialogHeader>
        <DialogTitle>Add type</DialogTitle>
      </DialogHeader>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        id={id}
        placeholder="Enter type name"
      />
      <DialogFooter className="flex-row justify-end space-x-2">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </form>
  );
};

export const AddTypeModal = ({ close }: AddTypeModalProps) => (
  <DialogContent className="w-10/12 max-w-md rounded-lg">
    <AddTypeForm close={close} />
  </DialogContent>
);
