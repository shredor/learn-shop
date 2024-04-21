import { useAction } from '@reatom/npm-react';
import { useId, useState } from 'react';

import { addBrandAction } from '@/entities/device/model/device.model';

import { Button } from '@/shared/ui/shadcn/button';
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/shadcn/dialog';
import { Input } from '@/shared/ui/shadcn/input';

type AddBrandModalProps = {
  close: () => void;
};

const AddBrandForm = ({ close }: AddBrandModalProps) => {
  const id = useId();
  const [name, setName] = useState('');
  const addBrand = useAction(addBrandAction);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addBrand(name).then(() => {
      close();
    });
  };

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <DialogHeader>
        <DialogTitle>Add brand</DialogTitle>
      </DialogHeader>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        id={id}
        placeholder="Enter brand name"
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

export const AddBrandModal = ({ close }: AddBrandModalProps) => (
  <DialogContent className="w-10/12 max-w-md rounded-lg">
    <AddBrandForm close={close} />
  </DialogContent>
);
