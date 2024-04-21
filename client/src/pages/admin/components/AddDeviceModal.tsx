import { useAction, useAtom } from '@reatom/npm-react';
import { Fragment, useId, useState } from 'react';

import {
  addDeviceAction,
  brandsResource,
  typesResource,
} from '@/entities/device/model/device.model';

import { Button } from '@/shared/ui/shadcn/button';
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/shadcn/dialog';
import { Input } from '@/shared/ui/shadcn/input';
import { Label } from '@/shared/ui/shadcn/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/select';

type AddDeviceModalProps = {
  close: () => void;
};

const AddDeviceForm = ({ close }: AddDeviceModalProps) => {
  const id = useId();
  const types = useAtom(typesResource.dataAtom)[0];
  const brands = useAtom(brandsResource.dataAtom)[0];
  const addDevice = useAction(addDeviceAction);
  const [name, setName] = useState('');
  const [price, setPrice] = useState<string>('');
  const [img, setImg] = useState<File>();
  const [typeId, setTypeId] = useState<string>('');
  const [brandId, setBrandId] = useState<string>('');
  const [info, setInfo] = useState<{ title: string; description: string; number: number }[]>([]);

  const typeHtmlId = `${id}-type`;
  const brandHtmlId = `${id}-brand`;
  const nameId = `${id}-name`;
  const fileId = `${id}-file`;
  const priceId = `${id}-price`;

  const addInfo = () => {
    setInfo([...info, { title: '', description: '', number: Date.now() }]);
  };

  const setInfoTitle = (number: number, title: string) => {
    setInfo(info.map((info) => (info.number === number ? { ...info, title: title } : info)));
  };

  const setInfoDescription = (number: number, description: string) => {
    setInfo(
      info.map((info) => (info.number === number ? { ...info, description: description } : info)),
    );
  };

  const removeInfo = (number: number) => {
    setInfo(
      info.filter((item) => {
        return item.number !== number;
      }),
    );
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!price || !img || !price || !brandId || !typeId) return;

    addDevice({
      name,
      price: +price,
      brandId: +brandId,
      typeId: +typeId,
      info,
      img,
    }).then(() => {
      close();
    });
  };

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <DialogHeader>
        <DialogTitle>Add device</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor={nameId}>Name</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id={nameId}
            placeholder="Enter device name"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={typeHtmlId}>Type</Label>
          <Select name="typeId" value={typeId} onValueChange={(value) => setTypeId(value)}>
            <SelectTrigger id={typeHtmlId}>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {types.map((type) => (
                <SelectItem key={type.id} value={type.id.toString()}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor={brandHtmlId}>Brand</Label>
          <Select name="brandId" value={brandId} onValueChange={(value) => setBrandId(value)}>
            <SelectTrigger id={brandHtmlId}>
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem key={brand.id} value={brand.id.toString()}>
                  {brand.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor={priceId}>Price</Label>
          <Input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            id={priceId}
            placeholder="Enter device price"
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={fileId}>Image</Label>
          <Input
            className="text-foreground"
            onChange={(e) => setImg(e.target.files?.[0])}
            accept="image/*"
            type="file"
            id={fileId}
            placeholder="Enter device name"
          />
        </div>

        <hr />

        {info.map((item) => {
          const titleId = `info-${item.number}`;
          const descriptionId = `info-${item.number}`;

          return (
            <Fragment key={item.number}>
              <div className="grid gap-2">
                <Label htmlFor={titleId}>Title</Label>
                <Input
                  value={item.title}
                  onChange={(e) => setInfoTitle(item.number, e.target.value)}
                  id={titleId}
                  placeholder="Enter info title"
                />
                <Label htmlFor={descriptionId}>Description</Label>
                <Input
                  value={item.description}
                  onChange={(e) => setInfoDescription(item.number, e.target.value)}
                  id={descriptionId}
                  placeholder="Enter info description"
                />
                <Button
                  className="bg-red-500 hover:bg-red-400"
                  onClick={() => removeInfo(item.number)}
                >
                  Remove
                </Button>
              </div>
              <hr />
            </Fragment>
          );
        })}

        <Button type="button" onClick={addInfo}>
          Add info
        </Button>
      </div>
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

export const AddDeviceModal = ({ close }: AddDeviceModalProps) => (
  <DialogContent className="w-10/12 max-w-md rounded-lg">
    <AddDeviceForm close={close} />
  </DialogContent>
);
